import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Adjust this to match your backend URL

const SubLocalityServices = {
  getSubLocality: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/subLocality/get`);
      return response.data;
    } catch (error) {
      console.error('Error fetching SubLocality:', error);
      throw new Error('Could not fetch SubLocality.');
    }
  },

  createSubLocality: async (subLocalityData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/subLocality/create`, subLocalityData);
      return response.data;
    } catch (error) {
      console.error('Error creating SubLocality:', error);
      throw new Error('Could not create SubLocality.');
    }
  },

  updateSubLocality: async (id, subLocalityData) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/subLocality/update/${id}`, subLocalityData);
      return response.data;
    } catch (error) {
      console.error('Error updating SubLocality:', error);
      throw new Error('Could not update SubLocality.');
    }
  },

  deleteSubLocality: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/subLocality/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting SubLocality:', error);
      throw new Error('Could not delete SubLocality.');
    }
  },
};

export default SubLocalityServices;
