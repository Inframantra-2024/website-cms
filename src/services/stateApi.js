import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Adjust this to match your backend URL

const StateServices = {
  getStates: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/state/states`);
      return response.data;
    } catch (error) {
      console.error('Error fetching states:', error);
      throw new Error('Could not fetch states.');
    }
  },

  createState: async (stateData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/state/add`, stateData);
      return response.data;
    } catch (error) {
      console.error('Error creating state:', error);
      throw new Error('Could not create state.');
    }
  },

  updateState: async (id, stateData) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/state/update/${id}`, stateData);
      return response.data;
    } catch (error) {
      console.error('Error updating state:', error);
      throw new Error('Could not update state.');
    }
  },

  deleteState: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/state/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting state:', error);
      throw new Error('Could not delete state.');
    }
  },
};

export default StateServices;
