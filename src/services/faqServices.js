import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Adjust this to match your backend URL

const FaqCategoryServices = {
  getFaqCategory: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/faqCategory/get`);
      return response.data;
    } catch (error) {
      console.error('Error fetching FaqCategory:', error);
      throw new Error('Could not fetch FaqCategory.');
    }
  },

  createFaqCategory: async (FaqCategoryData) => {
    console.log(FaqCategoryData);
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/faqCategory/create`, FaqCategoryData);
      return response;
    } catch (error) {
      console.error('Error creating FaqCategory:', error);
      throw new Error('Could not create FaqCategory.');
    }
  },

  updateFaqCategory: async (id, FaqCategoryData) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/faqCategory/update/${id}`, FaqCategoryData);
      return response;
    } catch (error) {
      console.error('Error updating FaqCategory:', error);
      throw new Error('Could not update FaqCategory.');
    }
  },

  deleteFaqCategory: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/faqCategory/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting FaqCategory:', error);
      throw new Error('Could not delete FaqCategory.');
    }
  },

  getFaq: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/faq/get`);
      return response.data;
    } catch (error) {
      console.error('Error fetching FaqCategory:', error);
      throw new Error('Could not fetch FaqCategory.');
    }
  },

  createFaq: async (FaqCategoryData) => {
    console.log(FaqCategoryData);
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/faq/create`, FaqCategoryData);
      return response;
    } catch (error) {
      console.error('Error creating FaqCategory:', error);
      throw new Error('Could not create FaqCategory.');
    }
  },

  updateFaq: async (id, FaqCategoryData) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/faq/update/${id}`, FaqCategoryData);
      return response;
    } catch (error) {
      console.error('Error updating FaqCategory:', error);
      throw new Error('Could not update FaqCategory.');
    }
  },

  deleteFaq: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/faq/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting FaqCategory:', error);
      throw new Error('Could not delete FaqCategory.');
    }
  },
};

export default FaqCategoryServices;
