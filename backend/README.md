# 🚀 Satish AI Portfolio - Backend

A high-performance FastAPI backend that powers the interactive AI portfolio chatbot. Built with modern Python practices and optimized for production deployment.

![Python](https://img.shields.io/badge/Python-3.12+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-orange)

## ✨ Features

- **FastAPI Framework** - High-performance async web framework
- **OpenAI Integration** - GPT-4o-mini powered intelligent conversations
- **Analytics Tracking** - Built-in conversation and usage analytics
- **Static File Serving** - Optimized asset delivery
- **Health Monitoring** - Comprehensive health checks and logging
- **Secure Configuration** - Environment-based API key management

## 🛠️ Technology Stack

- **Python 3.12+** - Modern Python with latest features
- **FastAPI** - Async web framework with automatic OpenAPI docs
- **OpenAI API** - GPT-4o-mini for intelligent responses
- **Pydantic** - Data validation and settings management
- **Uvicorn** - Lightning-fast ASGI server
- **UV Package Manager** - Fast, reliable dependency management

## 📁 Project Structure

```
backend/
├── app.py                 # Main FastAPI application
├── analytics.py           # Analytics tracking module
├── pyproject.toml        # Python dependencies and project config
├── uv.lock              # Dependency lock file
├── Dockerfile           # Container configuration
├── run_backend.sh       # Development startup script
├── static/              # Static file serving
│   ├── Resume_satish_2025.txt  # Context data
│   └── satish_photo.jpeg      # Profile photo
└── logs/                # Application logs (created at runtime)
    ├── analytics.json
    └── conversations.json
```

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- UV package manager (recommended) or pip
- OpenAI API key

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies with UV (recommended)
uv sync

# Or with pip
pip install -r requirements.txt

# Configure environment
cp ../.env.example ../.env
# Edit .env with your OpenAI API key
```

### Development Server

```bash
# Start with hot reload
python app.py

# Or using uvicorn directly
uvicorn app:app --reload --host 0.0.0.0 --port 8310
```

The API will be available at:
- **API Base**: http://localhost:8310
- **Interactive Docs**: http://localhost:8310/docs
- **Health Check**: http://localhost:8310/api/health

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
MODEL_NAME=gpt-4o-mini
MAX_TOKENS=1000
TEMPERATURE=0.7

# Optional: Custom API Base URL
# API_BASE_URL=https://api.openai.com/v1

# Server Configuration
SERVER_PORT=8310
LOG_LEVEL=INFO

# Features
ENABLE_LOGGING=true
ENABLE_ANALYTICS=true
```

## 📡 API Endpoints

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Basic health check |
| GET | `/api/health` | Detailed health status |
| POST | `/api/chat` | Chat with Satish's AI |
| GET | `/api/profile` | Get profile information |
| GET | `/api/examples` | Get example questions |
| GET | `/api/analytics` | Get usage analytics |
| GET | `/static/*` | Static file serving |

### API Documentation

FastAPI automatically generates interactive API documentation:
- **Swagger UI**: http://localhost:8310/docs
- **ReDoc**: http://localhost:8310/redoc

### Example API Usage

```bash
# Health check
curl http://localhost:8310/api/health

# Get profile
curl http://localhost:8310/api/profile

# Chat with Satish
curl -X POST http://localhost:8310/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me about your experience",
    "history": []
  }'
```

## 🏗️ Architecture

### Core Components

1. **SatishChatbot Class**
   - Manages OpenAI API integration
   - Handles conversation context
   - Provides intelligent responses

2. **Analytics Module**
   - Tracks conversation metrics
   - Logs user interactions
   - Provides usage insights

3. **Static File Serving**
   - Serves profile photos
   - Delivers resume content
   - Optimized asset delivery

### Data Models

```python
# Chat request/response
class ChatMessage(BaseModel):
    message: str
    history: List[Dict[str, str]] = []

class ChatResponse(BaseModel):
    response: str
    success: bool
    error: Optional[str] = None
```

## 📊 Analytics & Monitoring

### Built-in Analytics

The backend tracks:
- Total messages exchanged
- Response characteristics
- Error rates and types
- Conversation patterns

### Log Files

```bash
# View application logs
tail -f logs/chatbot.log

# Check analytics data
cat logs/analytics.json

# Review conversations
cat logs/conversations.json
```

### Health Monitoring

```bash
# Check API health
curl http://localhost:8310/api/health

# Response includes:
{
  "status": "healthy",
  "api_configured": true,
  "timestamp": "2025-06-28T10:30:00"
}
```

## 🐳 Docker Deployment

### Build and Run

```bash
# Build image
docker build -t satish-backend .

# Run container
docker run -p 8310:8310 \
  -e OPENAI_API_KEY=your_key \
  satish-backend

# Or use docker-compose (from project root)
docker-compose up backend
```

### Container Features

- Non-root user for security
- Health checks included
- Volume mounts for logs
- Environment variable support

## 🔐 Security

### Best Practices Implemented

- **Environment Variables** - Secure API key storage
- **CORS Configuration** - Controlled cross-origin requests
- **Input Validation** - Pydantic models prevent injection
- **Error Handling** - No sensitive data in responses
- **Logging** - Comprehensive audit trail

### Production Considerations

```python
# Example production settings
CORS_ORIGINS = [
    "https://yourdomain.com",
    "https://www.yourdomain.com"
]

# Rate limiting (recommended addition)
# API key rotation policies
# Request size limits
```

## 🧪 Testing

### Manual Testing

```bash
# Test health endpoint
curl http://localhost:8310/api/health

# Test chat functionality
curl -X POST http://localhost:8310/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello Satish!"}'
```

### Automated Testing (Future Enhancement)

```python
# Example test structure
def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200

def test_chat_endpoint():
    response = client.post("/api/chat", 
        json={"message": "Test message"})
    assert response.status_code == 200
```

## 🔧 Development

### Code Structure

- **app.py** - Main application and routes
- **analytics.py** - Analytics functionality
- **static/** - Static assets and context files

### Adding New Features

1. **New Endpoint**:
   ```python
   @app.get("/api/new-feature")
   async def new_feature():
       return {"status": "implemented"}
   ```

2. **Enhanced Analytics**:
   ```python
   # Add to analytics.py
   def track_custom_metric(self, metric_name, value):
       self._update_analytics(metric_name, value)
   ```

### Performance Optimization

- Use async/await for I/O operations
- Implement response caching where appropriate
- Monitor memory usage for long-running conversations

## 📋 Troubleshooting

### Common Issues

1. **OpenAI API Errors**
   ```bash
   # Check API key configuration
   echo $OPENAI_API_KEY
   
   # Verify API access
   curl -H "Authorization: Bearer $OPENAI_API_KEY" \
        https://api.openai.com/v1/models
   ```

2. **Port Conflicts**
   ```bash
   # Check if port 8310 is in use
   lsof -i :8310
   
   # Use different port
   uvicorn app:app --port 8311
   ```

3. **Static File Issues**
   ```bash
   # Ensure static directory exists
   mkdir -p static
   
   # Check file permissions
   ls -la static/
   ```

## 🚀 Deployment

### Production Checklist

- [ ] Environment variables configured
- [ ] OpenAI API key validated
- [ ] Logging directory writable
- [ ] Health checks responding
- [ ] CORS origins configured
- [ ] SSL/TLS certificates (if applicable)

### Scaling Considerations

- Use reverse proxy (nginx) for static files
- Implement Redis for session storage
- Add database for persistent analytics
- Use load balancer for multiple instances

---

**Built with ❤️ by Satish | FastAPI + OpenAI + Modern Python**
