#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Setting up Satish's AI Portfolio (React + FastAPI)${NC}"
echo "================================================================"

# Check if we're in the right directory
if [ ! -f "pyproject.toml" ]; then
    echo -e "${RED}❌ Error: pyproject.toml not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Create necessary directories
mkdir -p static logs

# Check if photo exists in static directory
if [ -f "static/satish_photo.jpeg" ]; then
    echo -e "${GREEN}✅ Photo available in static directory${NC}"
else
    echo -e "${YELLOW}⚠️  Warning: Photo 'static/satish_photo.jpeg' not found - profile image may not display${NC}"
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Warning: .env file not found${NC}"
    echo -e "${BLUE}📝 Creating .env file from template...${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✅ Created .env file. Please edit it with your OpenAI API key.${NC}"
    else
        cat > .env << EOF
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here
MODEL_NAME=gpt-4o-mini
MAX_TOKENS=1000
TEMPERATURE=0.7

# Server Configuration
SERVER_PORT=8000
LOG_LEVEL=INFO
ENABLE_LOGGING=true

# Analytics
ENABLE_ANALYTICS=true
EOF
        echo -e "${GREEN}✅ Created .env file. Please edit it with your OpenAI API key.${NC}"
    fi
fi

echo ""
echo -e "${BLUE}🐍 Setting up Python Backend...${NC}"
echo "--------------------------------"

# Install Python dependencies
echo -e "${YELLOW}📦 Installing Python dependencies...${NC}"
if command -v uv &> /dev/null; then
    uv sync
else
    pip install -e .
fi

echo ""
echo -e "${BLUE}⚛️  Setting up React Frontend...${NC}"
echo "--------------------------------"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Error: Node.js is not installed. Please install Node.js first.${NC}"
    echo -e "${BLUE}💡 You can install Node.js from: https://nodejs.org/${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ Error: npm is not installed. Please install npm first.${NC}"
    exit 1
fi

# Install frontend dependencies
cd frontend
echo -e "${YELLOW}📦 Installing React dependencies...${NC}"
npm install

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "================================================================"
echo ""
echo -e "${BLUE}🎯 Next Steps:${NC}"
echo ""
echo -e "${YELLOW}1. Configure your OpenAI API key in .env file:${NC}"
echo "   OPENAI_API_KEY=your_actual_api_key_here"
echo ""
echo -e "${YELLOW}2. Start the application:${NC}"
echo "   ${GREEN}./run_react_app.sh${NC}     # Run both backend and frontend"
echo "   ${GREEN}./run_backend.sh${NC}      # Run only backend (FastAPI)"
echo "   ${GREEN}./run_frontend.sh${NC}     # Run only frontend (React)"
echo ""
echo -e "${BLUE}🌐 Access URLs:${NC}"
echo "   Frontend: http://localhost:3010"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo -e "${BLUE}💼 Features:${NC}"
echo "   • Modern React UI with professional design"
echo "   • Real-time chat with Satish's AI persona"
echo "   • Photo integration (properly working)"
echo "   • FastAPI backend with OpenAI integration"
echo "   • Analytics and logging"
echo "   • Responsive design for all devices"
echo ""
echo -e "${GREEN}🎉 Your AI Portfolio is ready to launch!${NC}"
