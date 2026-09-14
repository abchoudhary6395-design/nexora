import apiClient from './client';

export const invoiceService = {
  list: (params) => apiClient.get('/invoices', { params }),
  get: (id) => apiClient.get(`/invoices/${id}`),
  create: (payload) => apiClient.post('/invoices', payload),
  update: (id, payload) => apiClient.put(`/invoices/${id}`, payload),
  remove: (id) => apiClient.delete(`/invoices/${id}`),
  downloadPdf: (id) => apiClient.get(`/invoices/${id}/pdf`, { responseType: 'blob' }),
};
