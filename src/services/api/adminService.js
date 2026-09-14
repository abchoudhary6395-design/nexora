import apiClient from './client';

export const adminService = {
  listUsers: (params = {}) => apiClient.get('/users', { params }),
  listRoles: () => apiClient.get('/roles'),
  inviteUser: (payload) => apiClient.post('/users/invite', payload),
  updateUserRole: (userId, roleId) => apiClient.patch(`/users/${userId}/role`, { role_id: roleId }),
  updateUserStatus: (userId, status) => apiClient.patch(`/users/${userId}/status`, { status }),
};
