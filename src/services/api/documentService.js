import apiClient from './client';

export const documentService = {
  list: (params) => apiClient.get('/documents', { params }),
  upload: (formData) =>
    apiClient.post('/documents', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => apiClient.delete(`/documents/${id}`),
  rename: (id, name) => apiClient.patch(`/documents/${id}`, { name }),
};
