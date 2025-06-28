import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Send, User, Bot, Loader, RefreshCw, Github, Linkedin, Phone, Mail, AlertCircle } from 'lucide-react';

// Styled Components
const AppContainer = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', sans-serif;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  overflow: hidden;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  max-height: 100vh;
  
  @media (max-width: 1024px) {
    max-height: 40vh;
    overflow-y: auto;
  }
`;

const Header = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1.2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: calc(100vh - 2rem);
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(102, 126, 234, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(102, 126, 234, 0.3);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(102, 126, 234, 0.5);
  }
  
  @media (max-width: 1024px) {
    height: auto;
    max-height: 40vh;
  }
`;

const ProfilePhoto = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 25%;
  border: 4px solid #667eea;
  margin: 0 auto 0.75rem auto;
  display: block;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  }
  
  /* Different positioning options for face alignment */
  &.face-center {
    object-position: center center;
  }
  
  &.face-top {
    object-position: center 15%;
  }
  
  &.face-upper {
    object-position: center 25%;
  }
  
  &.face-lower {
    object-position: center 40%;
  }
  
  /* You can experiment with these values:
     - object-position: center 20% (moves face higher)
     - object-position: center 30% (moves face lower)
     - object-position: center center (centers the face)
  */
`;

const ProfilePlaceholder = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.75rem auto;
  font-size: 2.5rem;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  color: #2d3748;
  margin-bottom: 0.25rem;
  font-weight: 700;
  font-size: 1.8rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: #4a5568;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Description = styled.p`
  color: #718096;
  line-height: 1.4;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
  margin-bottom: 0.75rem;
`;

const Skill = styled.span`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ExpertiseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const ExpertiseCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 0.75rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ExpertiseIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.4rem;
`;

const ExpertiseTitle = styled.h4`
  color: #2d3748;
  margin: 0 0 0.4rem 0;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ExpertiseDescription = styled.p`
  color: #4a5568;
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.3;
`;

const AchievementsContainer = styled.div`
  margin-top: 0.75rem;
  text-align: left;
`;



const SectionTitle = styled.h3`
  color: #2d3748;
  margin: 0.75rem 0 0.5rem 0;
  font-weight: 600;
  text-align: center;
  font-size: 0.9rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.3rem;
`;

const ContactInfo = styled.div`
  background: rgba(102, 126, 234, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  padding: 0.75rem;
  margin: 0.75rem 0;
  border: 1px solid rgba(102, 126, 234, 0.3);
  text-align: center;
`;

const ContactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  
  @media (max-width: 768px) {
    gap: 0.25rem;
    flex-direction: column;
    align-items: center;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #2d3748;
  font-weight: 500;
  font-size: 0.75rem;
  padding: 0.15rem 0.3rem;
  
  svg {
    width: 14px;
    height: 14px;
    color: #667eea;
    flex-shrink: 0;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #2d3748;
  font-weight: 500;
  font-size: 0.75rem;
  text-decoration: none;
  padding: 0.15rem 0.3rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #667eea;
    transform: translateY(-1px);
  }
  
  svg {
    width: 14px;
    height: 14px;
    color: #667eea;
    flex-shrink: 0;
  }
`;

const AchievementItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 0.6rem 0.8rem;
  margin-bottom: 0.4rem;
  border-radius: 8px;
  border-left: 3px solid #667eea;
  color: #2d3748;
  font-size: 0.8rem;
  line-height: 1.3;
`;



const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  
  @media (max-width: 1024px) {
    height: 60vh;
    max-height: 60vh;
  }
`;

const MessagesContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 1rem;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-height: 0;
  max-height: calc(100vh - 140px);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(102, 126, 234, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(102, 126, 234, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(102, 126, 234, 0.5);
  }
  
  @media (max-width: 1024px) {
    max-height: calc(60vh - 140px);
  }
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  ${props => props.isUser && 'flex-direction: row-reverse;'}
`;

const MessageIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${props => props.isUser ? '0 0 0 0.75rem' : '0 0.75rem 0 0'};
  background: ${props => props.isUser ? '#667eea' : '#4FD1C7'};
  color: white;
`;

const MessageBubble = styled.div`
  background: ${props => props.isUser ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#f7fafc'};
  color: ${props => props.isUser ? 'white' : '#2d3748'};
  padding: 0.75rem 1rem;
  border-radius: 16px;
  max-width: 70%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.4;
  word-wrap: break-word;
  font-size: 0.9rem;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  
  /* Handle markdown-style formatting */
  strong, b {
    font-weight: 600;
  }
  
  em, i {
    font-style: italic;
  }
  
  code {
    background: rgba(0, 0, 0, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.85em;
  }
  
  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
  
  li {
    margin: 0.25rem 0;
  }
  
  p {
    margin: 0.5rem 0;
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const InputContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;

  &:hover {
    background: #c53030;
    transform: translateY(-2px);
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
  font-style: italic;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e53e3e;
  background: rgba(229, 62, 62, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

const ConnectionStatus = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: ${props => props.connected ? '#48bb78' : '#e53e3e'};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

// Helper function to check backend connectivity
const checkBackendHealth = async () => {
  try {
    const response = await fetch('/api/health', { 
      method: 'GET',
      timeout: 5000 
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Helper function to render AI responses with basic markdown support
const renderMessage = (content) => {
  if (typeof content !== 'string') return content;
  
  // Simple markdown-like formatting
  let formatted = content
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Line breaks
    .replace(/\n/g, '<br />');
  
  return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
};

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    });
  }, []);

  // Check backend health periodically
  useEffect(() => {
    const checkHealth = async () => {
      const healthy = await checkBackendHealth();
      setIsConnected(healthy);
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    // Fetch profile data with error handling
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile information');
        setIsConnected(false);
      }
    };

    fetchProfile();
  }, []);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = messageText.trim();
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    // Add user message to chat
    const newUserMessage = { type: 'user', content: userMessage, timestamp: new Date() };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Prepare history for API
      const history = messages.map(msg => ({
        [msg.type]: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: history
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        const botMessage = { type: 'assistant', content: data.response, timestamp: new Date() };
        setMessages(prev => [...prev, botMessage]);
        setIsConnected(true);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error:', error);
      setIsConnected(false);
      const errorMessage = { 
        type: 'assistant', 
        content: 'I apologize, but I encountered an error. Please check the connection and try again.', 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMessage]);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <>
      <ConnectionStatus connected={isConnected}>
        {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
      </ConnectionStatus>
      
      <AppContainer>
        {/* Left Panel - Profile Information */}
        <LeftPanel>
          <Header>
            {error && (
              <ErrorMessage>
                <AlertCircle size={16} />
                {error}
              </ErrorMessage>
            )}
            
            {profile && (
              <>
                {profile.photo_url ? (
                  <ProfilePhoto
                    className="face-upper"
                    src={`http://localhost:8310${profile.photo_url}`}
                    alt={profile.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : (
                  <ProfilePlaceholder>
                    👨‍💻
                  </ProfilePlaceholder>
                )}
                <div style={{display: 'none'}}>
                  <ProfilePlaceholder>
                    👨‍💻
                  </ProfilePlaceholder>
                </div>
              
              <Title>{profile.name}</Title>
              <Subtitle>{profile.title}</Subtitle>
              <Description>{profile.description}</Description>
              
              {/* Contact Information - Prominent Display */}
              {profile.contact && (
                <ContactInfo>
                  <SectionTitle>💼 Contact Information</SectionTitle>
                  <ContactRow>
                    {profile.contact.email && (
                      <ContactItem>
                        <Mail />
                        <span>{profile.contact.email}</span>
                      </ContactItem>
                    )}
                    {profile.contact.mobile && (
                      <ContactItem>
                        <Phone />
                        <span>{profile.contact.mobile}</span>
                      </ContactItem>
                    )}
                    {profile.contact.github && (
                      <SocialLink href={profile.contact.github} target="_blank" rel="noopener noreferrer">
                        <Github />
                        <span>GitHub</span>
                      </SocialLink>
                    )}
                    {profile.contact.linkedin && (
                      <SocialLink href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin />
                        <span>LinkedIn</span>
                      </SocialLink>
                    )}
                  </ContactRow>
                </ContactInfo>
              )}
              
              <SectionTitle>⚡ Technical Skills</SectionTitle>
              <SkillsContainer>
                {profile.skills.map((skill, index) => (
                  <Skill key={index}>{skill}</Skill>
                ))}
              </SkillsContainer>
              
              <SectionTitle>💼 Areas of Expertise</SectionTitle>
              <ExpertiseContainer>
                {profile.expertise_areas.map((area, index) => (
                  <ExpertiseCard key={index}>
                    <ExpertiseIcon>{area.icon}</ExpertiseIcon>
                    <ExpertiseTitle>{area.area}</ExpertiseTitle>
                    <ExpertiseDescription>{area.description}</ExpertiseDescription>
                  </ExpertiseCard>
                ))}
              </ExpertiseContainer>
              
              <AchievementsContainer>
                <SectionTitle>🏆 Key Achievements</SectionTitle>
                {profile.achievements.map((achievement, index) => (
                  <AchievementItem key={index}>
                    {achievement}
                  </AchievementItem>
                ))}
              </AchievementsContainer>
            </>
          )}
        </Header>
      </LeftPanel>

      {/* Right Panel - Chat Interface */}
      <ChatContainer>
        {/* Messages */}
        <MessagesContainer>
          {messages.map((message, index) => (
            <Message key={index} isUser={message.type === 'user'}>
              <MessageIcon isUser={message.type === 'user'}>
                {message.type === 'user' ? <User size={18} /> : <Bot size={18} />}
              </MessageIcon>
              <MessageBubble isUser={message.type === 'user'}>
                {renderMessage(message.content)}
              </MessageBubble>
            </Message>
          ))}
          
          {isLoading && (
            <Message isUser={false}>
              <MessageIcon isUser={false}>
                <Bot size={18} />
              </MessageIcon>
              <MessageBubble isUser={false}>
                <LoadingMessage>
                  <Loader size={16} className="animate-spin" />
                  Satish is thinking...
                </LoadingMessage>
              </MessageBubble>
            </Message>
          )}
          
          <div ref={messagesEndRef} />
        </MessagesContainer>

        {/* Input */}
        <InputContainer>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here... (Press Enter to send)"
              disabled={isLoading}
            />
            <SendButton type="submit" disabled={isLoading || !inputMessage.trim()}>
              {isLoading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
              Send
            </SendButton>
          </form>
          {messages.length > 0 && (
            <ClearButton onClick={clearChat}>
              <RefreshCw size={18} />
              Clear
            </ClearButton>
          )}
        </InputContainer>
      </ChatContainer>
    </AppContainer>
    </>
  );
}

export default App;
