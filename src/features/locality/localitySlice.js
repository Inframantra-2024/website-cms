import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import  localityServices from '../../services/localityServices'

const initialState = {
    data: [],
    status: 'idle',
    error: null,
  };
  

// Thunk to fetch Locality
export const fetchLocality = createAsyncThunk('Locality/fetchLocality', async () => {
  try{
    const response = await localityServices.getLocality();
    return response;
  }catch(error){
    throw error;
  }
});

// Thunk to create a new Locality
export const createLocality = createAsyncThunk('Locality/createLocality', async (LocalityData) => {
  try{
    const response = await localityServices.createLocality(LocalityData);
    return response;
  }catch(error){
     throw error;
  }
});

// Thunk to update an existing Locality
export const updateLocality = createAsyncThunk('Locality/updateLocality', async ({ id, LocalityData }) => {
  try{
    const response = await localityServices.updateLocality(id, LocalityData);
     return response;
  }catch(error){
    throw error;
  }
});

// Thunk to delete a Locality
export const deleteLocality = createAsyncThunk('Locality/deleteLocality', async (LocalityId) => {
   try{
    const response = await localityServices.deleteLocality(LocalityId);
    return response;
   }catch(error){

   }
});

const LocalitySlice = createSlice({
  name: 'locality',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch Locality
      .addCase(fetchLocality.pending, (Locality) => {
        Locality.status = 'loading';
      })
      .addCase(fetchLocality.fulfilled, (Locality, action) => {
        Locality.status = 'succeeded';
        Locality.data = action.payload;
      })
      .addCase(fetchLocality.rejected, (Locality, action) => {
        Locality.status = 'failed';
        Locality.error = action.error.message;
      })
      // Handle create Locality
      .addCase(createLocality.pending, (Locality) => {
        Locality.status = 'loading';
      })
      .addCase(createLocality.fulfilled, (Locality, action) => {
        Locality.status = 'succeeded';
        // Locality.data.push(action.payload);
      })
      .addCase(createLocality.rejected, (Locality, action) => {
        Locality.status = 'failed';
        Locality.error = action.error.message;
      })
      // Handle update Locality
      .addCase(updateLocality.pending, (Locality) => {
        Locality.status = 'loading';
      })
      .addCase(updateLocality.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex((state) => state._id === action.payload._id);
        if (index !== -1) {
            state.data[index] = action.payload;
        }
      })
      .addCase(updateLocality.rejected, (Locality, action) => {
        Locality.status = 'failed';
        Locality.error = action.error.message;
      })
      // Handle delete Locality
      .addCase(deleteLocality.pending, (Locality) => {
        Locality.deleteStatus = 'loading';
      })
      .addCase(deleteLocality.fulfilled, (Locality, action) => {
        Locality.status = 'succeeded';
      })
      .addCase(deleteLocality.rejected, (Locality, action) => {
        Locality.status = 'failed';
        Locality.error = action.error.message;
      });
  },
});

export default LocalitySlice.reducer;
