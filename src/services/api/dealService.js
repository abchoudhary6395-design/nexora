import apiClient from './client';

export const dealService = {
  list: (params) => apiClient.get('/deals', { params }),
  get: (id) => apiClient.get(`/deals/${id}`),
  create: (payload) => apiClient.post('/deals', payload),
  update: (id, payload) => apiClient.put(`/deals/${id}`, payload),
  updateStage: (id, stage) => apiClient.patch(`/deals/${id}/stage`, { stage }),
  remove: (id) => apiClient.delete(`/deals/${id}`),
};
