# 🚀 Satish's AI Portfolio - Multi-Module Architecture

A modern, secure interactive AI portfolio featuring a React frontend and FastAPI backend with proper multi-module structure. Chat with Satish's AI persona to learn about his experience, expertise, and projects!

![Portfolio Preview](https://img.shields.io/badge/Tech_Stack-React+FastAPI-blue)
![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen)
![AI Powered](https://img.shields.io/badge/AI-OpenAI_GPT--4o--mini-orange)
![Node Version](https://img.shields.io/badge/Node.js-22_Alpine-green)
![Security](https://img.shields.io/badge/Security-Vulnerabilities_Fixed-success)

## ✨ Features

### 🎨 Modern React Frontend (Node.js 22)
- **Latest Security**: Node.js 22 Alpine with all vulnerability fixes
- **Beautiful UI**: Gradient backgrounds, glassmorphism effects, and smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Professional Photo Display**: Properly integrated photo rendering
- **Real-time Chat**: Instant responses with typing indicators
- **Interactive Examples**: Pre-built questions to get conversations started

### 🚀 FastAPI Backend
- **High Performance**: Async FastAPI backend for blazing-fast responses
- **OpenAI Integration**: Powered by GPT-4o-mini for intelligent conversations
- **Analytics Tracking**: Built-in conversation analytics and logging
- **RESTful API**: Clean, documented API endpoints
- **Static File Serving**: Optimized photo and asset delivery

### 🏗️ Multi-Module Architecture
- **Separated Concerns**: Clear frontend/backend boundaries
- **Independent Deployment**: Each module can be deployed separately
- **Docker Support**: Individual Dockerfiles + docker-compose orchestration
- **Development Flexibility**: Work on frontend/backend independently

## 🛠️ Technology Stack

### Frontend (`/frontend`)
- **Node.js 22 Alpine** - Latest LTS with security fixes
- **React 18** - Modern React with hooks and functional components
- **Styled Components** - CSS-in-JS for dynamic styling
- **Lucide React** - Beautiful, consistent icons
- **Axios** - HTTP client for API communication
- **Serve** - Production static file serving

### Backend (`/backend`)
- **Python 3.12** - Latest Python with modern features
- **FastAPI** - High-performance async Python web framework
- **OpenAI API** - GPT-4o-mini for intelligent responses
- **Pydantic** - Data validation and settings management
- **Uvicorn** - Lightning-fast ASGI server
- **UV Package Manager** - Fast, reliable dependency management

## 📁 Project Structure

```
satish-ai-portfolio/
├── 📋 docker-compose.yml        # Multi-service orchestration
├── 📋 Dockerfile              # Legacy multi-stage build
├── 📋 README.md               # This file
├── 📋 run_react_app.sh        # Development runner
├── 📋 .env                    # Environment configuration
├── 📋 .gitignore             # Git ignore rules
│
├── 📁 frontend/               # React Application
│   ├── 📋 Dockerfile         # Frontend container
│   ├── 📋 package.json       # Node.js dependencies
│   ├── 📋 run_frontend.sh    # Frontend dev script
│   ├── 📁 public/            # Static assets
│   └── 📁 src/               # React source code
│       ├── App.js            # Main React component
│       ├── index.js          # React entry point
│       └── index.css         # Global styles
│
└── 📁 backend/                # FastAPI Application
    ├── 📋 Dockerfile         # Backend container
    ├── 📋 app.py             # Main FastAPI application
    ├── 📋 pyproject.toml     # Python dependencies
    ├── 📋 analytics.py       # Analytics tracking
    ├── 📋 satish_context.md  # AI personality context
    ├── 📋 setup_react_app.sh # Setup script
    ├── 📋 run_backend.sh     # Backend dev script
    ├── 📁 static/            # Static file serving
    └── 📁 logs/              # Application logs
```

## 🚀 Quick Start

### Prerequisites
- **Docker & Docker Compose** (Recommended)
- **Python 3.12+** and **Node.js 22+** (For development)
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd satish-ai-portfolio

# Configure API key
cp .env.example .env
# Edit .env and add your OpenAI API key

# Start with Docker Compose
docker-compose up --build

# Access the application
# Frontend: http://localhost:3010
# Backend: http://localhost:8000
```

### Option 2: Development Mode

```bash
# Run the automated development setup
./run_react_app.sh

# Or run services individually:

# Terminal 1 - Backend
cd backend
python app.py

# Terminal 2 - Frontend
cd frontend
npm install
npm start
```

## 🐳 Docker Deployment

### Multi-Service with Docker Compose
```bash
# Production deployment
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Individual Service Deployment
```bash
# Build and run frontend only
cd frontend
docker build -t satish-frontend .
docker run -p 3010:3010 satish-frontend

# Build and run backend only
cd backend
docker build -t satish-backend .
docker run -p 8000:8000 satish-backend
```

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm install
npm start          # Development server with hot reload
npm run build      # Production build
npm run serve      # Serve production build locally
```

### Backend Development
```bash
cd backend
uv sync            # Install dependencies
python app.py      # Start with hot reload
```

### API Endpoints
- `GET /` - Health check
- `GET /api/health` - Detailed health status
- `POST /api/chat` - Chat with Satish
- `GET /api/profile` - Get profile information
- `GET /api/examples` - Get example questions
- `GET /static/*` - Static file serving
- `GET /docs` - Interactive API documentation

## 🔐 Security Features

### Node.js 22 Security Updates
- **CVE Fixes**: All known vulnerabilities patched
- **Alpine Base**: Minimal attack surface
- **Non-root User**: Container security best practices
- **Dependency Updates**: Latest secure package versions

### Application Security
- **Environment Variables**: Secure API key storage
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Pydantic models for data validation
- **Error Handling**: Graceful error responses without exposing internals
- **Health Checks**: Monitoring and alerting capabilities

## 🎯 Key Improvements

### ✅ Multi-Module Architecture
- **Separation of Concerns**: Clean frontend/backend boundaries
- **Independent Scaling**: Scale services independently
- **Development Efficiency**: Teams can work on modules separately
- **Deployment Flexibility**: Deploy to different environments

### ✅ Security Enhancements
- **Node.js 22**: Latest LTS with security patches
- **Vulnerability Scanning**: Regular dependency updates
- **Container Security**: Non-root users, minimal base images
- **Environment Isolation**: Proper secrets management

### ✅ Enhanced Performance
- **Frontend**: React optimizations with production builds
- **Backend**: FastAPI's async capabilities
- **Caching**: Optimized static file serving
- **Health Monitoring**: Comprehensive health checks

## 🤝 Chat Examples

Try these conversation starters:
- "Tell me about your professional background and experience"
- "What are your key technical skills and expertise areas?"
- "Can you walk me through your current AI/ML projects?"
- "What's your experience with Large Language Models?"
- "How do you approach solving complex technical challenges?"
- "What advice would you give for career growth in AI/ML?"

## 🎨 Customization

### Frontend Styling
Edit `frontend/src/App.js` to customize:
- Color schemes and gradients
- Component layouts and spacing
- Animations and transitions

### Backend Configuration
Edit `backend/satish_context.md` to:
- Update professional information
- Add new skills and experiences
- Modify conversation style

### Environment Variables
Configure in `.env`:
```env
# OpenAI API Configuration
OPENAI_API_KEY=your_actual_openai_api_key_here
MODEL_NAME=gpt-4o-mini
MAX_TOKENS=1000
TEMPERATURE=0.7

# Server Configuration
SERVER_PORT=8000
LOG_LEVEL=INFO
ENABLE_LOGGING=true
ENABLE_ANALYTICS=true
```

## 📊 Monitoring & Analytics

### Application Logs
```bash
# View backend logs
tail -f backend/logs/chatbot.log

# View analytics
cat backend/logs/analytics.json

# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Health Monitoring
- **Frontend**: http://localhost:3010 (React app status)
- **Backend**: http://localhost:8000/api/health (API health check)
- **Docker**: Built-in health checks with auto-restart

## 🚀 Production Deployment

### Environment Setup
1. **Server Requirements**: Docker, Docker Compose
2. **Domain Setup**: Configure DNS for your domain
3. **SSL Certificates**: Use Let's Encrypt or similar
4. **Environment Variables**: Secure API key storage
5. **Monitoring**: Set up logging and alerting

### Deployment Commands
```bash
# Production build and deploy
docker-compose -f docker-compose.yml up -d --build

# Update deployment
git pull
docker-compose up -d --build

# Backup data
docker-compose exec backend tar -czf /tmp/backup.tar.gz logs/ static/
```

## 📝 License

This project showcases modern web development practices with AI integration.

---

**Built with ❤️ by Satish | Powered by React 18, FastAPI, Node.js 22, and OpenAI**

*Secure • Modern • Production-Ready*

## ✨ Features

### 🎨 Modern React Frontend
- **Beautiful UI**: Gradient backgrounds, glassmorphism effects, and smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Professional Photo Display**: Properly integrated photo rendering (fixed Gradio limitations)
- **Real-time Chat**: Instant responses with typing indicators
- **Interactive Examples**: Pre-built questions to get conversations started

### 🚀 FastAPI Backend
- **High Performance**: Async FastAPI backend for blazing-fast responses
- **OpenAI Integration**: Powered by GPT-4o-mini for intelligent conversations
- **Analytics Tracking**: Built-in conversation analytics and logging
- **RESTful API**: Clean, documented API endpoints
- **Static File Serving**: Optimized photo and asset delivery

### 🤖 AI Personality
- **Authentic Responses**: Trained on Satish's real resume and experience
- **Professional Context**: 17+ years experience, IIT Delhi education, current role at Hitachi Vantara
- **Technical Expertise**: Deep knowledge in AI/ML, Python, cloud technologies, and leadership
- **Conversation Memory**: Maintains context throughout the chat session

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Styled Components** - CSS-in-JS for dynamic styling
- **Lucide React** - Beautiful, consistent icons
- **Axios** - HTTP client for API communication

### Backend
- **FastAPI** - High-performance async Python web framework
- **OpenAI API** - GPT-4o-mini for intelligent responses
- **Pydantic** - Data validation and settings management
- **Uvicorn** - Lightning-fast ASGI server

### Infrastructure
- **Python 3.12+** - Modern Python with latest features
- **UV Package Manager** - Fast, reliable dependency management
- **Docker Support** - Containerized deployment ready
- **Environment Configuration** - Secure API key management

## 🚀 Quick Start

### Prerequisites
- **Python 3.12+**
- **Node.js 16+** and **npm**
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

### 1. Clone and Setup
```bash
git clone <repository-url>
cd satish-ai-portfolio

# Run the automated setup
./setup_react_app.sh
```

### 2. Configure API Key
Edit the `.env` file:
```env
OPENAI_API_KEY=your_actual_openai_api_key_here
MODEL_NAME=gpt-4o-mini
MAX_TOKENS=1000
TEMPERATURE=0.7
```

### 3. Launch the Application
```bash
# Start both frontend and backend
./run_react_app.sh

# Or start them separately:
./run_backend.sh    # FastAPI server on :8000
./run_frontend.sh   # React app on :3010
```

### 4. Access the Portfolio
- **Frontend**: http://localhost:3010
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📁 Project Structure

```
satish-ai-portfolio/
├── 📁 backend/                 # FastAPI backend
│   ├── app.py                 # Main FastAPI application
│   └── requirements.txt       # Python dependencies
├── 📁 frontend/               # React frontend
│   ├── 📁 public/            # Static assets
│   ├── 📁 src/               # React source code
│   │   ├── App.js            # Main React component
│   │   ├── index.js          # React entry point
│   │   └── index.css         # Global styles
│   └── package.json          # Node.js dependencies
├── 📁 static/                # Static file serving
│   └── satish_photo.jpeg     # Professional photo
├── analytics.py              # Analytics tracking
├── satish_context.md         # AI personality context
├── .env                      # Environment configuration
├── pyproject.toml           # Python project config
└── 📋 Scripts:
    ├── setup_react_app.sh    # Automated setup
    ├── run_react_app.sh      # Run full stack
    ├── run_backend.sh        # Run backend only
    └── run_frontend.sh       # Run frontend only
```

## 🔧 Development

### Backend Development
```bash
# Start backend with hot reload
cd backend
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development
```bash
# Start React dev server
cd frontend
npm start
```

### API Endpoints
- `GET /` - Health check
- `GET /api/health` - Detailed health status
- `POST /api/chat` - Chat with Satish
- `GET /api/profile` - Get profile information
- `GET /api/examples` - Get example questions
- `GET /static/*` - Static file serving

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build manually
docker build -t satish-portfolio .
docker run -p 3010:3010 -p 8000:8000 satish-portfolio
```

## 📊 Analytics & Monitoring

The application includes built-in analytics:
- **Conversation Tracking**: All interactions logged
- **Performance Metrics**: Response times and success rates
- **Usage Statistics**: Popular questions and user patterns
- **Error Monitoring**: Automatic error detection and logging

View logs:
```bash
tail -f logs/chatbot.log          # Application logs
cat logs/analytics.json           # Analytics data
cat logs/conversations.json       # Conversation history
```

## 🎯 Key Improvements Over Gradio Version

### ✅ Photo Rendering Fixed
- **Problem**: Gradio had limitations with base64 image rendering for avatars
- **Solution**: React with proper static file serving through FastAPI
- **Result**: Professional photo displays perfectly in header

### ✅ Better Performance
- **Frontend**: React's virtual DOM for efficient updates
- **Backend**: FastAPI's async capabilities for concurrent requests
- **Caching**: Optimized static file serving

### ✅ Enhanced UI/UX
- **Modern Design**: Glassmorphism effects and smooth animations
- **Responsive**: Works on all devices and screen sizes
- **Professional**: Clean, portfolio-quality interface

### ✅ Improved Architecture
- **Separation of Concerns**: Clear frontend/backend boundaries
- **Scalability**: Easy to extend and maintain
- **API-First**: RESTful design for future integrations

## 🤝 Chat Examples

Try these conversation starters:
- "Tell me about your professional background and experience"
- "What are your key technical skills and expertise areas?"
- "Can you walk me through your current AI/ML projects?"
- "What's your experience with Large Language Models?"
- "How do you approach solving complex technical challenges?"
- "What advice would you give for career growth in AI/ML?"

## 🔐 Security Features

- **Environment Variables**: Secure API key storage
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Pydantic models for data validation
- **Error Handling**: Graceful error responses without exposing internals

## 🎨 Customization

### Styling
Edit `frontend/src/App.js` to customize:
- Color schemes and gradients
- Component layouts and spacing
- Animations and transitions

### AI Personality
Edit `satish_context.md` to:
- Update professional information
- Add new skills and experiences
- Modify conversation style

### Features
- Add new API endpoints in `backend/app.py`
- Create new React components in `frontend/src/components/`
- Extend analytics in `analytics.py`

## 📝 License

This project is a professional portfolio showcasing modern web development practices with AI integration.

## 🚀 Live Demo

Once deployed, your portfolio will be available at your chosen domain with:
- Professional photo display working perfectly
- Real-time AI chat functionality
- Mobile-responsive design
- Production-ready performance

---

**Built with ❤️ by Satish | Powered by React, FastAPI, and OpenAI**