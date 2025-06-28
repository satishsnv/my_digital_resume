from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import openai
import os
from pathlib import Path
from dotenv import load_dotenv
from typing import List, Dict, Optional
import logging
from datetime import datetime
import sys
sys.path.append(str(Path(__file__).parent))
from analytics import PortfolioAnalytics

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

app = FastAPI(title="Satish AI Portfolio API", version="1.0.0")

# Enable CORS - More secure configuration
allowed_origins = [
    "http://localhost:3010",
    "http://0.0.0.0:3010", 
    "http://127.0.0.1:3010"
]

# Add custom origins from environment if provided
custom_origins = os.getenv('CORS_ORIGINS', '')
if custom_origins:
    allowed_origins.extend([origin.strip() for origin in custom_origins.split(',') if origin.strip()])

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Only allow needed methods
    allow_headers=["*"],
)

# Mount static files
static_dir = Path(__file__).parent / "static"
static_dir.mkdir(exist_ok=True)
app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")

class ChatMessage(BaseModel):
    message: str
    history: List[Dict[str, str]] = []

class ChatResponse(BaseModel):
    response: str
    success: bool
    error: Optional[str] = None

class SatishChatbot:
    def __init__(self):
        """Initialize the Satish chatbot with context and configuration."""
        self.setup_api()
        self.load_context()
        self.analytics = PortfolioAnalytics()
        logging.info("Satish AI Portfolio API initialized successfully")
        
    def setup_api(self):
        """Setup OpenAI API configuration."""
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            logging.warning("OPENAI_API_KEY not found - AI chat will be unavailable")
            self.client = None
            return
            
        try:
            self.client = openai.OpenAI(
                api_key=api_key,
                base_url=os.getenv('API_BASE_URL', None)
            )
            
            self.model_name = os.getenv('MODEL_NAME', 'gpt-4o-mini')
            self.max_tokens = int(os.getenv('MAX_TOKENS', '1000'))
            self.temperature = float(os.getenv('TEMPERATURE', '0.7'))
            
            # Test the API connection
            self.client.models.list()
            logging.info(f"OpenAI API initialized successfully with model: {self.model_name}")
            
        except Exception as e:
            logging.error(f"Failed to initialize OpenAI API: {e}")
            self.client = None
        
    def load_context(self):
        """Load Satish's context from the resume text file."""
        context_path = Path(__file__).parent / "static" / "Resume_satish_2025.txt"
        try:
            with open(context_path, 'r', encoding='utf-8') as f:
                self.context = f.read()
        except FileNotFoundError:
            logging.warning(f"Context file not found at {context_path}")
            self.context = "I am Satish, a software engineer passionate about AI and technology."
    
    def create_system_prompt(self) -> str:
        """Create the system prompt that defines Satish's personality."""
        return f"""You are Satish, responding to messages as if you are him personally. Use the following resume and professional information about Satish to inform your responses:

        {self.context}

        IMPORTANT INSTRUCTIONS:
        1. Respond as Satish in first person (use "I", "my", "me") 
        2. Be conversational and professional, as if you are Satish himself
        3. Draw from Satish's background, experience, and expertise when relevant
        4. If asked about technical topics, provide insights based on Satish's actual experience from the resume
        5. Stay in character as Satish throughout the conversation
        6. Be encouraging and supportive, especially for career-related questions
        7. Focus on information that's actually in the resume - don't make up details
        8. Keep responses focused and practical
        9. Use a professional yet approachable tone
        10. Provide responses in markdown format for better frontend rendering
        11. When discussing projects, refer to the specific work mentioned in the resume
        12. For contact information, use the details provided in the resume

        CONTACT DETAILS FROM RESUME:
        - Email: snvskiit@gmail.com
        - Phone: +91-9963699436
        - GitHub: https://github.com/satishsnv/
        - LinkedIn: https://in.linkedin.com/in/satishsnv

        Remember: You ARE Satish, not an AI assistant representing him. Base all responses on the actual information in the resume provided above."""

    def generate_response(self, user_message: str, history: List[Dict[str, str]]) -> str:
        """Generate a response from Satish."""
        if not self.client:
            return "I'm sorry, but the AI service is currently unavailable. Please check the API configuration."
            
        try:
            # Prepare conversation history for API
            messages = [{"role": "system", "content": self.create_system_prompt()}]
            
            # Add conversation history (last 5 exchanges)
            for exchange in history[-5:]:
                if exchange.get("user"):
                    messages.append({"role": "user", "content": exchange["user"]})
                if exchange.get("assistant"):
                    messages.append({"role": "assistant", "content": exchange["assistant"]})
            
            # Add current message
            messages.append({"role": "user", "content": user_message})
            
            # Generate response
            response = self.client.chat.completions.create(
                model=self.model_name,
                messages=messages,
                max_tokens=self.max_tokens,
                temperature=self.temperature,
                stream=False
            )
            
            assistant_response = response.choices[0].message.content
            
            # Track analytics
            self.analytics.log_message(user_message, len(assistant_response))
            
            logging.info(f"Generated response for user message: {user_message[:50]}...")
            return assistant_response
            
        except Exception as e:
            logging.error(f"Error generating response: {e}")
            return "I apologize, but I'm having trouble processing your message right now. Please try again in a moment."

# Initialize chatbot
chatbot = SatishChatbot()

@app.get("/")
async def root():
    """Health check endpoint."""
    return {"message": "Satish AI Portfolio API is running", "status": "healthy"}

@app.get("/api/health")
async def health_check():
    """Detailed health check."""
    return {
        "status": "healthy",
        "api_configured": chatbot.client is not None,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat(chat_message: ChatMessage):
    """Chat endpoint for conversations with Satish."""
    try:
        if not chat_message.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        response = chatbot.generate_response(chat_message.message, chat_message.history)
        
        return ChatResponse(
            response=response,
            success=True
        )
    
    except Exception as e:
        logging.error(f"Error in chat endpoint: {e}")
        return ChatResponse(
            response="I'm experiencing some technical difficulties. Please try again.",
            success=False,
            error=str(e)
        )

@app.get("/api/profile")
async def get_profile():
    """Get Satish's profile information."""
    return {
        "name": "Seethepalli Naga Venkata Satish Kumar",
        "title": "Engineering Leader | Architect | Senior Manager",
        "description": "I'm Satish, an Engineering Leader with 18 years of experience in product development and leading high-performing teams to deliver innovative products. Curious about how my expertise aligns with your opportunities? Feel free to chat with me to explore my experience, and technical capabilities in detail!",
        "skills": ["Solution Architecture", "Microservices", "ML/Generative AI/Agentic AI", "Team Leadership", "AuthZ/AuthN", "Cloud"],
        "experience": "18 years",
        "current_role": "Senior Engineering Manager at Hitachi Vantara",
        "education": "M.Tech, IIT Delhi",
        "photo_url": "/static/satish_photo.jpeg",
        "contact": {
            "email": "snvskiit@gmail.com",
            "mobile": "+91-9963699436",
            "github": "https://github.com/satishsnv/",
            "linkedin": "https://in.linkedin.com/in/satishsnv"
        },
        "expertise_areas": [
            {
                "area": "Architecture & Design",
                "description": "Enterprise-scale solution architecture, microservices transformation, cloud-native design",
                "icon": "🏗️"
            },
            {
                "area": "Product Development", 
                "description": "End-to-end product lifecycle management, from ideation to production deployment",
                "icon": "🚀"
            },
            {
                "area": "AI/ML Solutions",
                "description": "GenAI applications, Integration and deployment of AI/ML models, intelligent agents using MCP protocol",
                "icon": "🤖"
            },
            {
                "area": "Team Leadership",
                "description": "Building & mentoring cross-functional teams, scaling engineering organizations",
                "icon": "👥"
            }
        ],
        "achievements": [
            "Architected and delivered AI/ML features from inception to production",
            "Spearheaded the development of GenAI-Companion using LLM, LangChain and RAG",
            "Built self sustaining teams with a focus on innovation and quality",            
            "Successfully transformed monolith architectures to scalable microservices"
        ]
    }

@app.get("/api/analytics")
async def get_analytics():
    """Get analytics data for the portfolio."""
    try:
        analytics_data = chatbot.analytics.get_analytics()
        return {
            "success": True,
            "data": analytics_data
        }
    except Exception as e:
        logging.error(f"Error getting analytics: {e}")
        return {
            "success": False,
            "error": str(e),
            "data": {}
        }

if __name__ == "__main__":
    import uvicorn
    
    # Ensure static photo exists for the application
    static_photo = static_dir / "satish_photo.jpeg"
    if static_photo.exists():
        logging.info(f"Photo available at: {static_photo}")
    else:
        logging.warning(f"Photo not found at {static_photo} - profile image may not display")
    
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8310,
        reload=True,
        log_level="info"
    )