import apiClient from './client';

export const customerService = {
  list: (params) => apiClient.get('/customers', { params }),
  get: (id) => apiClient.get(`/customers/${id}`),
  create: (payload) => apiClient.post('/customers', payload),
  update: (id, payload) => apiClient.put(`/customers/${id}`, payload),
  remove: (id) => apiClient.delete(`/customers/${id}`),
};
