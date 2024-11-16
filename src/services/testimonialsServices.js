import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Adjust this to match your backend URL

const TestimonialsServices = {
  getTestimonials: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/testimonials/get`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Testimonials:', error);
      throw new Error('Could not fetch Testimonials.');
    }
  },

  createTestimonials: async (TestimonialsData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/testimonials/create`, TestimonialsData);
      return response.data;
    } catch (error) {
      console.error('Error creating Testimonials:', error);
      throw new Error('Could not create Testimonials.');
    }
  },

  updateTestimonials: async (id, testimonialsData) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/testimonials/update/${id}`, testimonialsData);
      return response.data;
    } catch (error) {
      console.error('Error updating Testimonials:', error);
      throw new Error('Could not update Testimonials.');
    }
  },

  deleteTestimonials: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/testimonials/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting Testimonials:', error);
      throw new Error('Could not delete Testimonials.');
    }
  },
};

export default TestimonialsServices;
