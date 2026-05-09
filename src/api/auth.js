import api from './axios';

export const authService = {
  async login(email, password) {
    const response = await api.post('login/', { email, password });
    const { access, refresh, user } = response.data;
    
    localStorage.setItem('token', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { access, refresh, user };
  },

  async register(email, password, nome) {
    const response = await api.post('register/', { email, password, nome });
    const { access, refresh, user } = response.data;
    
    localStorage.setItem('token', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { access, refresh, user };
  },

  async logout() {
    try {
      const refresh = localStorage.getItem('refresh');
      if (refresh) {
        await api.post('logout/', { refresh });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
    }
  },

  async getProfile() {
    const response = await api.get('user/profile/');
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  async updateProfile(data) {
    const response = await api.put('user/profile/', data);
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  async changePassword(currentPassword, newPassword) {
    return await api.post('user/change-password/', {
      current_password: currentPassword,
      new_password: newPassword
    });
  },

  async deleteAccount(currentPassword) {
    return await api.post('user/delete-account/', {
      current_password: currentPassword
    });
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};
