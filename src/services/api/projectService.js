import apiClient from './client';

export const projectService = {
  list: (params) => apiClient.get('/projects', { params }),
  get: (id) => apiClient.get(`/projects/${id}`),
  create: (payload) => apiClient.post('/projects', payload),
  update: (id, payload) => apiClient.put(`/projects/${id}`, payload),
  remove: (id) => apiClient.delete(`/projects/${id}`),
};
