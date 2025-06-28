# 🚀 Satish's AI Portfolio

A modern, interactive AI portfolio featuring a React frontend and FastAPI backend. Chat with Satish's AI persona to learn about his experience, expertise, and projects!

![Portfolio Preview](https://img.shields.io/badge/Tech_Stack-React+FastAPI-blue)
![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen)
![AI Powered](https://img.shields.io/badge/AI-OpenAI_GPT--4o--mini-orange)
![Security](https://img.shields.io/badge/Security-Enhanced-success)

## ✨ Overview

This portfolio consists of two main components:
- **React Frontend** - Modern, responsive UI with real-time chat capabilities
- **FastAPI Backend** - High-performance API server with OpenAI integration

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- OpenAI API Key ([Get one here](https://platform.openai.com/api-keys))

### Setup & Deploy
```bash
# Clone and configure
git clone <repository-url>
cd satish-ai-portfolio
cp .env.example .env
# Edit .env with your OpenAI API key

# Deploy with Docker
docker-compose up --build

# Access at:
# Frontend: http://localhost:3010
# Backend API: http://localhost:8310/docs
```

## 📖 Documentation

For detailed setup, configuration, and development information:

- **[🎨 Frontend Documentation](frontend/README.md)** - React app, UI components, styling, and development
- **[🚀 Backend Documentation](backend/README.md)** - FastAPI server, API endpoints, analytics, and deployment

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React 18, Styled Components, Lucide Icons |
| **Backend** | FastAPI, OpenAI GPT-4o-mini, Pydantic |
| **Infrastructure** | Docker, UV Package Manager |

## 📁 Project Structure

```
satish-ai-portfolio/
├── README.md              # This overview
├── docker-compose.yml     # Multi-service deployment
├── .env.example          # Configuration template
├── frontend/             # React application
│   └── README.md         # Frontend documentation
└── backend/              # FastAPI server
    └── README.md         # Backend documentation
```

## 🔧 Configuration

Create `.env` file:
```env
OPENAI_API_KEY=your_api_key_here
MODEL_NAME=gpt-4o-mini
SERVER_PORT=8310
```

## 🐳 Deployment

```bash
# Production deployment
docker-compose up -d --build

# Development mode
# See individual README files for detailed instructions
```

## 🔍 Health Monitoring

- **Backend Health**: http://localhost:8310/api/health
- **API Documentation**: http://localhost:8310/docs
- **Frontend**: http://localhost:3010

---

**Built with ❤️ by Satish | React + FastAPI + OpenAI**
