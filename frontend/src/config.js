// Configuration utility for environment variables
const config = {
  // Backend base URL - falls back to current origin if not set
  BACKEND_BASE_URL: import.meta.env.VITE_BACKEND_BASE_URL || window.location.origin,

  // API endpoints
  get API_BASE_URL() {
    return `${this.BACKEND_BASE_URL}/api`;
  },
  
  
  // Helper methods for building URLs
  apiUrl: (endpoint) => `${config.API_BASE_URL}${endpoint}`,
  staticUrl: (path) => `${config.BACKEND_BASE_URL}${path}`,
};

export default config;
