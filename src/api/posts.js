import api from './axios';

export const postsService = {
  async getAll(searchQuery = '') {
    const params = searchQuery ? { q: searchQuery } : {};
    const response = await api.get('posts/', { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`posts/${id}/`);
    return response.data;
  },

  async create(postData) {
    const response = await api.post('posts/', postData);
    return response.data;
  },

  async update(id, postData) {
    const response = await api.put(`posts/${id}/`, postData);
    return response.data;
  },

  async delete(id) {
    return await api.delete(`posts/${id}/`);
  }
};
