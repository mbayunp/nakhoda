import { create } from 'zustand';
import { authAPI } from '../services/api';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('nakhoda_user') || 'null'),
  token: localStorage.getItem('nakhoda_token') || null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const { data } = await authAPI.login({ email, password });
      localStorage.setItem('nakhoda_token', data.data.token);
      localStorage.setItem('nakhoda_user', JSON.stringify(data.data.user));
      set({ user: data.data.user, token: data.data.token, loading: false });
      return { success: true };
    } catch (err) {
      set({ loading: false });
      return { success: false, message: err.response?.data?.message || 'Login gagal' };
    }
  },

  register: async (name, email, password) => {
    set({ loading: true });
    try {
      await authAPI.register({ name, email, password });
      set({ loading: false });
      return { success: true };
    } catch (err) {
      set({ loading: false });
      return { success: false, message: err.response?.data?.message || 'Registrasi gagal' };
    }
  },

  logout: () => {
    localStorage.removeItem('nakhoda_token');
    localStorage.removeItem('nakhoda_user');
    set({ user: null, token: null });
  },

  isAuthenticated: () => !!localStorage.getItem('nakhoda_token'),
}));

export default useAuthStore;
