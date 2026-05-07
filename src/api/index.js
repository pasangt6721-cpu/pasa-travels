import axios from 'axios';

// Base API instance — update BASE_URL to your Django REST API endpoint
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach auth token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ─── Tour Endpoints ───────────────────────────────────────────
export const tourApi = {
  getAll: (params) => api.get('/tours/', { params }),
  getById: (id) => api.get(`/tours/${id}/`),
  getFeatured: () => api.get('/tours/featured/'),
};

// ─── Guide Endpoints ──────────────────────────────────────────
export const guideApi = {
  getAll: (params) => api.get('/guides/', { params }),
  getById: (id) => api.get(`/guides/${id}/`),
};

// ─── Destination Endpoints ────────────────────────────────────
export const destinationApi = {
  getAll: () => api.get('/destinations/'),
  getById: (id) => api.get(`/destinations/${id}/`),
};

// ─── Auth Endpoints ───────────────────────────────────────────
export const authApi = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (data) => api.post('/auth/register/', data),
  logout: () => api.post('/auth/logout/'),
  me: () => api.get('/auth/me/'),
};

// ─── Contact Endpoint ─────────────────────────────────────────
export const contactApi = {
  send: (data) => api.post('/contact/', data),
};

// ─── Newsletter Endpoint ──────────────────────────────────────
export const newsletterApi = {
  subscribe: (email) => api.post('/newsletter/', { email }),
};
