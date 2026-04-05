import axios from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptors if needed
api.interceptors.request.use((config) => {
    // Add token to requests if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Global error handling
        console.error('API error:', error);
        return Promise.reject(error);
    }
);

export default api;
