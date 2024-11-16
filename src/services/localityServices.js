import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Adjust this to match your backend URL

const LocalityServices = {
  getLocality: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/locality/get`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Locality:', error);
      throw new Error('Could not fetch Locality.');
    }
  },

  createLocality: async (LocalityData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/locality/create`, LocalityData);
      return response;
    } catch (error) {
      console.error('Error creating Locality:', error);
      throw new Error('Could not create Locality.');
    }
  },

  updateLocality: async (id, LocalityData) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/locality/update/${id}`, LocalityData);
      return response;
    } catch (error) {
      console.error('Error updating Locality:', error);
      throw new Error('Could not update Locality.');
    }
  },

  deleteLocality: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/locality/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting Locality:', error);
      throw new Error('Could not delete Locality.');
    }
  },
};

export default LocalityServices;
