import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Ensure this URL matches your backend's URL

const CityServices = {
  getCity: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/city/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  },

  createCity: async (cityData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/city/create`, cityData);
      return response.data;
    } catch (error) {
      console.error('Error creating city:', error);
      throw error;
    }
  },

  updateCity: async (id, cityData) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/city/update/${id}`, cityData);
      return response.data;
    } catch (error) {
      console.error('Error updating city:', error);
      throw error;
    }
  },
  deleteCity: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/city/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting city:', error);
      throw error;
    }
  },
};



export default CityServices;
