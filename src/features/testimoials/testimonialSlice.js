import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TestimonialsServices from '../../services/testimonialsServices';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

// Thunk to fetch testimonials
export const fetchTestimonials = createAsyncThunk('testimonials/fetchTestimonials', async () => {
  try {
    const response = await TestimonialsServices.getTestimonials();
    // console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
});

// Thunk to create a new testimonial
export const createTestimonial = createAsyncThunk('testimonials/createTestimonial', async (testimonial) => {
  try {
    const response = await TestimonialsServices.createTestimonials(testimonial);
    return response;
  } catch (error) {
    throw error;
  }
});

// Thunk to update an existing testimonial
export const updateTestimonial = createAsyncThunk('testimonials/updateTestimonial', async ({ id, testimonialsData }) => {
  try {
    const response = await TestimonialsServices.updateTestimonials(id, testimonialsData);
    return response;
  } catch (error) {
    throw error;
  }
});

// Thunk to delete a testimonial
export const deleteTestimonial = createAsyncThunk('testimonials/deleteTestimonial', async (id) => {
  try {
    await TestimonialsServices.deleteTestimonials(id);
    return id;
  } catch (error) {
    throw error;
  }
});

const testimonialSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle create testimonial
      .addCase(createTestimonial.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle update testimonial
      .addCase(updateTestimonial.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle delete testimonial
      .addCase(deleteTestimonial.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default testimonialSlice.reducer;
