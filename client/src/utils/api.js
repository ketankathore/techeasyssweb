// Centralized API configuration
// In local development, defaults to relative path '' which Vite proxies to localhost:5000.
// In production on Vercel, reads VITE_API_URL (e.g., https://your-backend.onrender.com).
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};
