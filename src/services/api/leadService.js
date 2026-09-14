import apiClient from './client';

export const leadService = {
  list: (params) => apiClient.get('/leads', { params }),
  get: (id) => apiClient.get(`/leads/${id}`),
  create: (payload) => apiClient.post('/leads', payload),
  update: (id, payload) => apiClient.put(`/leads/${id}`, payload),
  remove: (id) => apiClient.delete(`/leads/${id}`),
  bulkAssign: (ids, userId) => apiClient.post('/leads/bulk-assign', { ids, userId }),
};
