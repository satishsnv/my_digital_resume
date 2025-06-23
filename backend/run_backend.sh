#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🐍 Starting FastAPI Backend Server...${NC}"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "pyproject.toml" ]; then
    echo "❌ Error: pyproject.toml not found. Please run this script from the project root."
    exit 1
fi

# Ensure static directory exists and check for photo
mkdir -p static
if [ ! -f "static/satish_photo.jpeg" ]; then
    echo -e "${YELLOW}⚠️  Warning: Photo 'static/satish_photo.jpeg' not found - profile image may not display${NC}"
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. Please run ./setup_react_app.sh first."
    exit 1
fi

# Start the FastAPI server
echo -e "${GREEN}🚀 Starting backend on http://localhost:8000${NC}"
echo "📖 API documentation available at http://localhost:8000/docs"
echo ""

cd backend
python app.py
