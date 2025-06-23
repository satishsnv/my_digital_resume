#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}⚛️  Starting React Frontend Server...${NC}"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "pyproject.toml" ]; then
    echo "❌ Error: pyproject.toml not found. Please run this script from the project root."
    exit 1
fi

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    echo "❌ Error: frontend directory not found. Please run ./setup_react_app.sh first."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing React dependencies..."
    cd frontend
    npm install
    cd ..
fi

# Start the React development server
echo -e "${GREEN}🚀 Starting frontend on http://localhost:3010${NC}"
echo "🔄 Hot reload enabled - changes will be reflected automatically"
echo ""

cd frontend
npm start
