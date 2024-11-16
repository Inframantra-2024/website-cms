// services/projectServices.js
import axios from 'axios';

export const Project = {
  getProject: async () => {
    try {
      const response = await axios.get(`${process.env.BASE_URL}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Other user-related functions...
};