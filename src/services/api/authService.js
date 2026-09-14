import apiClient from './client';

export const authService = {
  login: (payload) => apiClient.post('/login', payload),
  register: (payload) => apiClient.post('/register', payload),
  logout: () => apiClient.post('/logout'),
  me: () => apiClient.get('/profile'),
  forgotPassword: (email) => apiClient.post('/forgot-password', { email }),
  resetPassword: (payload) => apiClient.post('/reset-password', payload),
};
