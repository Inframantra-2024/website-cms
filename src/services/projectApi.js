import axios from 'axios';

const BASE_URL = 'https://apitest.inframantra.com/api/v1'; // Ensure this URL matches your backend's URL

const ProjectServices = {
  getProjects: async (propertyId) => {
    try {
      const response = await axios.get(`${BASE_URL}/property/get`);
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await axios.post(`${BASE_URL}/property/add`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  updateProject: async (id, projectData) => {
    try {
      const response = await axios.put(`${BASE_URL}/property/update/${id}`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  deleteProject: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/project/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },
};

export default ProjectServices;
