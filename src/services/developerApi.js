// developerServices.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5001'; // Ensure this URL matches your backend's URL

const DeveloperServices = {
  getDevelopers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/developer`);
      return response.data;
    } catch (error) {
      console.error('Error fetching developers:', error);
      throw error;
    }
  },
  fetchDevelopers: async () => {
    try{
      const response = await axios.get(`${BASE_URL}/api/v1/developer`);
      return response.data;

    }catch(error){
        console.error('Error fetching developers:', error);
        throw error;
    }
  },

  createDeveloper: async (developerData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/developer/add`, developerData);
      return response.data;
    } catch (error) {
      console.error('Error creating developer:', error);
      throw error;
    }
  },

  updateDeveloper: async (id, developerData) => {
    try {
      if (!id) {
        throw new Error('ID parameter is required for updating developer.');
      }
      const response = await axios.put(`${BASE_URL}/api/v1/developer/update/${id}`, developerData);
      return response.data;
    } catch (error) {
      console.error('Error updating developer:', error);
      throw error;
    }
  },

  deleteDeveloper: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/developer/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting developer:', error);
      throw error;
    }
  },
};

export default DeveloperServices;
