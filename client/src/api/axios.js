import axios from 'axios';

const api = axios.create({
  timeout: 10000,
});
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    if (originalRequest.url.includes('/api/auth/login')) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        console.log('Перенаправление на логин');
        localStorage.removeItem('token');
        
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    
    return Promise.reject(error);
  }
);

export default api;