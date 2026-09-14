import apiClient from './client';

export const calendarService = {
  list: (params) => apiClient.get('/calendar', { params }),
  get: (id) => apiClient.get(`/calendar/${id}`),
  create: (payload) => apiClient.post('/calendar', payload),
  update: (id, payload) => apiClient.put(`/calendar/${id}`, payload),
  remove: (id) => apiClient.delete(`/calendar/${id}`),
};
