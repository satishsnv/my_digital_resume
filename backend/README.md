# 🚀 Backend - Satish's AI-Powered Digital Resume

A FastAPI backend that powers the interactive AI portfolio with OpenAI integration.

![Python](https://img.shields.io/badge/Python-3.12+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-orange)

## ✨ Features

- **FastAPI Framework** - High-performance async web framework
- **OpenAI Integration** - GPT-4o powered intelligent conversations
- **Analytics Tracking** - Conversation and usage analytics
- **Static File Serving** - Asset delivery (photos, resume)
- **Health Monitoring** - Health checks and logging

## 🛠️ Tech Stack

- **Python 3.12+** - Modern Python
- **FastAPI** - Async web framework
- **OpenAI API** - GPT-4o for AI responses
- **Uvicorn** - ASGI server
- **UV** - Fast package manager

## 🚀 Quick Start

### Prerequisites
- Python 3.12+ and UV package manager
- OpenAI API key

### Setup

1. **Install dependencies:**
   ```bash
   uv install
   ```

2. **Configure environment:**
   ```bash
   cp .envtemplate .env
   # Add your OpenAI API key to .env
   ```

3. **Start server:**
   ```bash
   uv run uvicorn app:app --host 0.0.0.0 --port 8310 --reload
   ```

4. **API docs:** http://0.0.0.0:8310/docs

## 🔧 Configuration

### Environment Variables

```bash
# .env file
OPENAI_API_KEY=your_openai_api_key_here
MODEL_NAME=gpt-4o
CORS_ORIGINS=http://localhost:3010,http://0.0.0.0:3010
```

### Project Structure

```
backend/
├── app.py              # Main FastAPI app
├── analytics.py        # Analytics tracking
├── pyproject.toml     # Dependencies
├── .envtemplate       # Environment template
└── static/            # Static files
    ├── Resume_satish_2025.txt
    └── satish_photo.jpeg
```

## 🌐 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/profile` | GET | Get profile data |
| `/api/chat` | POST | Send chat message |
| `/api/health` | GET | Health check |
| `/static/*` | GET | Static files |
| `/docs` | GET | API documentation |

### API Usage

```python
# Chat endpoint
POST /api/chat
{
  "message": "Hello!",
  "history": []
}
```

## 🚀 Deployment

### Production

```bash
# Using UV
uv run uvicorn app:app --host 0.0.0.0 --port 8310

# Using pip
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8310
```

### Docker

```bash
docker build -t satish-resume-backend .
docker run -p 8310:8310 --env-file .env satish-resume-backend
```

## 📊 Analytics

The backend tracks:
- Conversation counts
- Message analytics
- User interactions
- System health metrics

Analytics are stored in `logs/analytics.json`.

## � Troubleshooting

### Common Issues

**OpenAI API errors:**
- Check API key in `.env`
- Verify account has credits
- Check model availability

**CORS errors:**
- Update `CORS_ORIGINS` in `.env`
- Restart server after changes

**Port in use:**
```bash
lsof -i :8310
# Kill process if needed
```

## 🔒 Security

- Environment-based API key management
- Secure CORS configuration
- Input validation with Pydantic
- Request rate limiting (future enhancement)

---

**Built with ❤️ using FastAPI + OpenAI**
