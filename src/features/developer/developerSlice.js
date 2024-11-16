import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import DeveloperServices from '../../services/developerApi';

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

// Thunk to fetch developer data
export const fetchDeveloperData = createAsyncThunk('developer/fetchData', async () => {
  try {
    const response = await DeveloperServices.getDevelopers();
    return response;
  } catch (error) {
    throw error;
  }
});
// Thunk to fetch developer data
export const fetchDevelopers = createAsyncThunk('developer/fetchData', async () => {
    try {
      const response = await DeveloperServices.fetchDevelopers();
      return response;
    } catch (error) {
      throw error;
    }
  });

// Thunk to create a new developer
export const createDeveloper = createAsyncThunk('developer/createDeveloper', async (developerData) => {
  try {
    const response = await DeveloperServices.createDeveloper(developerData);
    return response;
  } catch (error) {
    throw error;
  }
});

// Thunk to update an existing developer
export const updateDeveloper = createAsyncThunk('developer/updateDeveloper', async ({ id, developerData }) => {
  try {
    const response = await DeveloperServices.updateDeveloper(id, developerData);
    return response;
  } catch (error) {
    throw error;
  }
});

// Thunk to delete a developer
export const deleteDeveloper = createAsyncThunk('developer/deleteDeveloper', async (developerId) => {
  try {
    const response = await DeveloperServices.deleteDeveloper(developerId);
    return response;
  } catch (error) {
    throw error;
  }
});

const developerSlice = createSlice({
  name: 'developer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch data
      .addCase(fetchDeveloperData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeveloperData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDeveloperData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle create developer
      .addCase(createDeveloper.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createDeveloper.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(createDeveloper.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle update developer
      .addCase(updateDeveloper.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateDeveloper.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.map((developer) =>
          developer._id === action.payload._id ? action.payload : developer
        );
      })
      .addCase(updateDeveloper.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle delete developer
      .addCase(deleteDeveloper.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteDeveloper.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Refetch the developer data after deletion
      })
      .addCase(deleteDeveloper.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default developerSlice.reducer;
