import axios from 'axios';

// Create axios instance with base configuration
const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  refreshToken: () => api.post('/auth/refresh'),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  getUser: (id) => api.get(`/users/${id}`),
  searchFreelancers: (params) => api.get('/users/search/freelancers', { params }),
  updateAvatar: (avatar) => api.put('/users/avatar', { avatar }),
  deactivateAccount: () => api.delete('/users/profile'),
};

// Project API calls
export const projectAPI = {
  createProject: (projectData) => api.post('/projects', projectData),
  getProjects: (params) => api.get('/projects', { params }),
  getProject: (id) => api.get(`/projects/${id}`),
  updateProject: (id, projectData) => api.put(`/projects/${id}`, projectData),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  getMyProjects: () => api.get('/projects/user/my-projects'),
};

// Bid API calls
export const bidAPI = {
  createBid: (bidData) => api.post('/bids', bidData),
  getProjectBids: (projectId) => api.get(`/bids/project/${projectId}`),
  getMyBids: () => api.get('/bids/my-bids'),
  acceptBid: (bidId) => api.put(`/bids/${bidId}/accept`),
  rejectBid: (bidId) => api.put(`/bid/${bidId}/reject`),
  withdrawBid: (bidId) => api.delete(`/bids/${bidId}`),
};

// Message API calls
export const messageAPI = {
  sendMessage: (messageData) => api.post('/messages', messageData),
  getConversations: () => api.get('/messages/conversations'),
  getConversation: (userId, params) => api.get(`/messages/conversation/${userId}`, { params }),
  markAsRead: (messageId) => api.put(`/messages/${messageId}/read`),
  getUnreadCount: () => api.get('/messages/unread-count'),
  deleteMessage: (messageId) => api.delete(`/messages/${messageId}`),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api; 