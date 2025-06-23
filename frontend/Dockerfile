# Frontend Dockerfile - React Application
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --silent

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:22-alpine AS production

# Install serve to run the built app
RUN npm install -g serve

# Copy built files
COPY --from=builder /app/build /app/build

# Expose port
EXPOSE 3010

# Set environment
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3010 || exit 1

# Run the application
CMD ["serve", "-s", "/app/build", "-l", "3010"]
