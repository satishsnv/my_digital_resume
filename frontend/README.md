# 🎨 Frontend - Satish's AI-Powered Digital Resume

A modern React frontend built with **Vite** for fast development and optimal performance.

![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)

## ✨ Features

- **🚀 Lightning Fast** - Vite for instant HMR and fast builds
- **💬 AI Chat Interface** - Interactive chat with backend AI
- **📱 Responsive Design** - Works on desktop, tablet, and mobile
- ** Secure** - Minimal dependencies, fewer vulnerabilities

## 🛠️ Tech Stack

- **React 18.2** - Modern React with hooks
- **Vite 4.4** - Next-generation frontend tooling
- **Lucide React** - Beautiful icons
- **CSS3** - Modern styling with gradients and animations

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm 8+
- Backend server running on port 8310

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your backend URL
   ```

3. **Start development:**
   ```bash
   npm run dev
   ```

4. **Open browser:** http://localhost:3010

## 📜 Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🔧 Configuration

### Environment Variables

```bash
# .env file
VITE_BACKEND_BASE_URL=http://0.0.0.0:8310
```

**Note:** Variables must start with `VITE_` prefix.

### Different Environments

```bash
# Development
VITE_BACKEND_BASE_URL=http://localhost:8310

# Production
VITE_BACKEND_BASE_URL=https://your-domain.com
```

## 🏗️ Project Structure

```
src/
├── App.js              # Main component
├── App.css             # Styles
├── index.js            # Entry point
├── config.js           # Environment config
└── ErrorBoundary.js    # Error handling
```

## 🌐 API Endpoints

- `/api/profile` - Get user profile
- `/api/chat` - Send chat messages
- `/api/health` - Health check
- `/static/*` - Static files

## 🚀 Deployment

### Production Build
```bash
npm run build
# Deploy the build/ directory
```

### Docker
```bash
docker build -t satish-resume-frontend .
docker run -p 3010:3010 satish-resume-frontend
```

## 🔍 Troubleshooting

### Common Issues

**Environment variables not working:**
- Ensure variables start with `VITE_`
- Restart dev server after changes

**Build errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port in use:**
```bash
lsof -ti:3010 | xargs kill -9
```

## 🔥 Why Vite over Create React App?

- **10x faster** development builds
- **95% fewer** dependencies (~89 vs 1500+)
- **78% fewer** vulnerabilities (2 moderate vs 9+ high)
- **Modern tooling** with better performance

---

**Built with ❤️ using Vite + React**