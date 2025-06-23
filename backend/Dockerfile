# Backend Dockerfile - FastAPI Application
FROM python:3.12-slim

LABEL maintainer="Satish <your.email@example.com>"
LABEL description="Interactive AI Portfolio - FastAPI Backend"
LABEL version="2.0.0"

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install UV package manager
RUN pip install uv

# Copy Python requirements and install dependencies
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen

# Copy application source
COPY . .

# Create logs directory
RUN mkdir -p logs

# Ensure static directory exists (photo should be included in source)
RUN mkdir -p static

# Create non-root user for security
RUN useradd -m -u 1000 portfolio && chown -R portfolio:portfolio /app
USER portfolio

# Expose port
EXPOSE 8310

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8310/api/health || exit 1

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# Start command
CMD ["uv", "run", "python", "app.py"]
