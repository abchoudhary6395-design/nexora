import apiClient from './client';

export const taskService = {
  list: (params) => apiClient.get('/tasks', { params }),
  get: (id) => apiClient.get(`/tasks/${id}`),
  create: (payload) => apiClient.post('/tasks', payload),
  update: (id, payload) => apiClient.put(`/tasks/${id}`, payload),
  updateStatus: (id, status) => apiClient.patch(`/tasks/${id}/status`, { status }),
  remove: (id) => apiClient.delete(`/tasks/${id}`),
};
