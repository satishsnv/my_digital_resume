// Configuration utility for environment variables
const config = {
  // Backend base URL - falls back to current origin if not set
  BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,

  // API endpoints
  get API_BASE_URL() {
    return `${this.BACKEND_BASE_URL}/api`;
  },
  
  get STATIC_BASE_URL() {
    return `${this.BACKEND_BASE_URL}/static`;
  },
  
  // Helper methods for building URLs
  apiUrl: (endpoint) => `${config.API_BASE_URL}${endpoint}`,
  staticUrl: (path) => `${config.STATIC_BASE_URL}${path}`,
};

export default config;
