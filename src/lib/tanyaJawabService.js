import axiosInstance from './axios';

const API_BASE = '/tanya-jawab';

export const tanyaJawabService = {
  // Public endpoints
  getAllPublic: async () => {
    try {
      const response = await axiosInstance.get(API_BASE);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  askQuestion: async (questionData) => {
    try {
      const response = await axiosInstance.post(API_BASE, questionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Admin endpoints
  getAllForAdmin: async (token) => {
    try {
      const response = await axiosInstance.get(`${API_BASE}/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getPending: async (token) => {
    try {
      const response = await axiosInstance.get(`${API_BASE}/admin/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  answerQuestion: async (id, answerData, token) => {
    try {
      const response = await axiosInstance.put(`${API_BASE}/${id}/answer`, answerData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateQuestion: async (id, updateData, token) => {
    try {
      const response = await axiosInstance.put(`${API_BASE}/${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteQuestion: async (id, token) => {
    try {
      const response = await axiosInstance.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
