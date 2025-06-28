import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, User, Bot, Loader, RefreshCw, Github, Linkedin, Phone, Mail, AlertCircle } from 'lucide-react';
import './App.css';
import config from './config';

// Helper function to check backend connectivity
const checkBackendHealth = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 5000); // 5 seconds timeout
    
    const response = await fetch(config.apiUrl('/health'), { 
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
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
  const [isProfileLoading, setIsProfileLoading] = useState(true);
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
        setIsProfileLoading(true);
        const response = await fetch(config.apiUrl('/profile'));
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
        setError(null);
        setIsConnected(true);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile information');
        setIsConnected(false);
      } finally {
        setIsProfileLoading(false);
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

      const response = await fetch(config.apiUrl('/chat'), {
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputMessage.trim() && !isLoading) {
        sendMessage(inputMessage);
      }
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <>
      <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
        {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
      </div>
      
      <div className="app-container">
        {/* Left Panel - Profile Information */}
        <div className="left-panel">
          <div className="header">
            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            
            {isProfileLoading ? (
              <div className="loading-message" style={{ padding: '2rem', textAlign: 'center' }}>
                <Loader size={24} className="animate-spin" />
                <p>Loading profile...</p>
              </div>
            ) : profile ? (
              <>
                {profile.photo_url ? (
                  <img
                    className="profile-photo face-upper"
                    src={config.staticUrl(profile.photo_url)}
                    alt={profile.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const nextSibling = e.target.nextSibling;
                      if (nextSibling) {
                        nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                ) : (
                  <div className="profile-placeholder">
                    👨‍💻
                  </div>
                )}
                <div className="hidden-placeholder">
                  <div className="profile-placeholder">
                    👨‍💻
                  </div>
                </div>
              
              <h1 className="title">{profile.name}</h1>
              <p className="subtitle">{profile.title}</p>
              <p className="description">{profile.description}</p>
              
              {/* Contact Information - Prominent Display */}
              {profile.contact && (
                <div className="contact-info">
                  <h3 className="section-title">💼 Contact Information</h3>
                  <div className="contact-row">
                    {profile.contact.email && (
                      <div className="contact-item">
                        <Mail />
                        <span>{profile.contact.email}</span>
                      </div>
                    )}
                    {profile.contact.mobile && (
                      <div className="contact-item">
                        <Phone />
                        <span>{profile.contact.mobile}</span>
                      </div>
                    )}
                    {profile.contact.github && (
                      <a className="social-link" href={profile.contact.github} target="_blank" rel="noopener noreferrer">
                        <Github />
                        <span>GitHub</span>
                      </a>
                    )}
                    {profile.contact.linkedin && (
                      <a className="social-link" href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
              
              <h3 className="section-title">⚡ Technical Skills</h3>
              <div className="skills-container">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="skill">{skill}</span>
                ))}
              </div>
              
              <h3 className="section-title">🎯 Areas of Expertise</h3>
              <div className="expertise-container">
                {profile.expertise_areas.map((area, index) => (
                  <div key={index} className="expertise-card">
                    <div className="expertise-icon">{area.icon}</div>
                    <h4 className="expertise-title">{area.area}</h4>
                    <p className="expertise-description">{area.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="achievements-container">
                <h3 className="section-title">🏆 Key Achievements</h3>
                {profile.achievements.map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    {achievement}
                  </div>
                ))}
              </div>
            </>
          ) : !error ? (
            <div className="loading-message" style={{ padding: '2rem', textAlign: 'center' }}>
              <p>No profile data available</p>
            </div>
          ) : null}
        </div>
        </div>

        {/* Right Panel - Chat Interface */}
        <div className="chat-container">
          {/* Messages */}
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type === 'user' ? 'user' : ''}`}>
                <div className={`message-icon ${message.type === 'user' ? 'user' : 'bot'}`}>
                  {message.type === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className={`message-bubble ${message.type === 'user' ? 'user' : 'bot'}`}>
                  {renderMessage(message.content)}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message">
                <div className="message-icon bot">
                  <Bot size={18} />
                </div>
                <div className="message-bubble bot">
                  <div className="loading-message">
                    <Loader size={16} className="animate-spin" />
                    Satish is thinking...
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="input-container">
            <form onSubmit={handleSubmit} className="form-container">
              <input
                className="input"
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here... (Press Enter to send)"
                disabled={isLoading}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="sentences"
              />
              <button className="send-button" type="submit" disabled={isLoading || !inputMessage.trim()}>
                {isLoading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
                <span>Send</span>
              </button>
            </form>
            {messages.length > 0 && (
              <button className="clear-button" onClick={clearChat}>
                <RefreshCw size={18} />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
