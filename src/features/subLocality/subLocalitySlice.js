import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SubLocalityServices from '../../services/subLocalityServices';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
  };
  

// Thunk to fetch Locality
export const fetchSubLocality = createAsyncThunk('SubLocality/fetchSubLocality', async () => {
  try{
    const response = await SubLocalityServices.getSubLocality();
    return response;
  }catch(error){
    throw error;
  }
});

// Thunk to create a new Locality
export const createSubLocality = createAsyncThunk('SubLocality/createSubLocality', async (LocalityData) => {
  try{
    const response = await SubLocalityServices.createSubLocality(LocalityData);
    return response;
  }catch(error){
     throw error;
  }
});

// Thunk to update an existing Locality
export const updateSubLocality = createAsyncThunk('SubLocality/updateSubLocality', async ({ id, LocalityData }) => {
  try{
    const response = await SubLocalityServices.updateSubLocality(id, LocalityData);
     return response;
  }catch(error){
    throw error;
  }
});

// Thunk to delete a Locality
export const deleteSubLocality = createAsyncThunk('SubLocality/deleteSubLocality', async (LocalityId) => {
   try{
    const response = await SubLocalityServices.deleteSubLocality(LocalityId);
    return response;
   }catch(error){

   }
});

const SubLocalitySlice = createSlice({
  name: 'locality',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch Locality
      .addCase(fetchSubLocality.pending, (Locality) => {
        Locality.status = 'loading';
      })
      .addCase(fetchSubLocality.fulfilled, (Locality, action) => {
        Locality.status = 'succeeded';
        Locality.data = action.payload;
      })
      .addCase(fetchSubLocality.rejected, (Locality, action) => {
        Locality.status = 'failed';
        Locality.error = action.error.message;
      })
      // Handle create Locality
      .addCase(createSubLocality.pending, (Locality) => {
        Locality.status = 'loading';
      })
      .addCase(createSubLocality.fulfilled, (Locality, action) => {
        Locality.status = 'succeeded';
        Locality.data.push(action.payload);
      })
      .addCase(createSubLocality.rejected, (Locality, action) => {
        Locality.status = 'failed';
        Locality.error = action.error.message;
      })
      // Handle update Locality
      .addCase(updateSubLocality.pending, (Locality) => {
        Locality.status = 'loading';
      })
      .addCase(updateSubLocality.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex((state) => state._id === action.payload._id);
        if (index !== -1) {
            state.data[index] = action.payload;
        }
      })
      .addCase(updateSubLocality.rejected, (Locality, action) => {
        Locality.status = 'failed';
        Locality.error = action.error.message;
      })
      // Handle delete Locality
      .addCase(deleteSubLocality.pending, (Locality) => {
        Locality.deleteStatus = 'loading';
      })
      .addCase(deleteSubLocality.fulfilled, (Locality, action) => {
        Locality.status = 'succeeded';
        Locality.data = Locality.data.filter((Locality) => Locality._id !== action.meta.arg);
      })
      .addCase(deleteSubLocality.rejected, (Locality, action) => {
        Locality.status = 'failed';
        Locality.error = action.error.message;
      });
  },
});

export default SubLocalitySlice.reducer;
