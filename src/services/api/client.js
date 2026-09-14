import axios from 'axios';

/**
 * Central Axios instance for all API calls.
 * Base URL points at the Laravel Sanctum-protected REST API
 * (see backend/routes/api.php).
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true, // required for Sanctum's cookie-based SPA auth
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('nexora-token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    // Backend envelope is { success, message, data, errors? } (see
    // backend/app/Traits/ApiResponse.php). Unwrap `data` into
    // response.data so call sites can keep using `response.data` /
    // `const { data } = await service.call()` directly, while the
    // original envelope (with `message`) stays available at
    // response.data.__envelope for the rare case it's needed.
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      const envelope = response.data;
      response.data = envelope.data ?? null;
      response.__envelope = envelope;
      // Paginated list responses also carry `meta` (current_page, total, etc.) —
      // preserve it on response.meta so list pages can read it if/when they
      // move from mock data to server-side pagination.
      if (envelope.meta) response.meta = envelope.meta;
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('nexora-token');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login?session=expired';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
