import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('nakhoda_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('nakhoda_token');
      localStorage.removeItem('nakhoda_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  me: () => API.get('/auth/me'),
};

export const portfolioAPI = {
  getAll: (params) => API.get('/portfolios', { params }),
  getById: (id) => API.get(`/portfolios/${id}`),
  create: (formData) => API.post('/portfolios', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => API.put(`/portfolios/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => API.delete(`/portfolios/${id}`),
};

export const orderAPI = {
  getAll: (params) => API.get('/orders', { params }),
  getById: (id) => API.get(`/orders/${id}`),
  create: (data) => API.post('/orders', data),
  update: (id, data) => API.put(`/orders/${id}`, data),
  updateStatus: (id, status) => API.put(`/orders/${id}/status`, { status }),
  delete: (id) => API.delete(`/orders/${id}`),
  summary: () => API.get('/orders/summary'),
};

export const materialAPI = {
  getAll: (params) => API.get('/materials', { params }),
  create: (data) => API.post('/materials', data),
  update: (id, data) => API.put(`/materials/${id}`, data),
  adjustStock: (id, data) => API.put(`/materials/${id}/stock`, data),
  delete: (id) => API.delete(`/materials/${id}`),
  lowStock: () => API.get('/materials/low-stock'),
};

export const customerAPI = {
  getAll: (params) => API.get('/customers', { params }),
  getById: (id) => API.get(`/customers/${id}`),
  create: (data) => API.post('/customers', data),
  update: (id, data) => API.put(`/customers/${id}`, data),
  delete: (id) => API.delete(`/customers/${id}`),
};

export const transactionAPI = {
  getAll: (params) => API.get('/transactions', { params }),
  create: (data) => API.post('/transactions', data),
  update: (id, data) => API.put(`/transactions/${id}`, data),
  delete: (id) => API.delete(`/transactions/${id}`),
  summary: () => API.get('/transactions/summary'),
};

export default API;

