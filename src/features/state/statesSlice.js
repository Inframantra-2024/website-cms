import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StateServices from '../../services/stateApi';

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

// Thunk to fetch states
export const fetchStates = createAsyncThunk('state/fetchStates', async () => {
  try{
    const response = await StateServices.getStates();
    return response;
  }catch(error){
    throw error;
  }
});

// Thunk to create a new state
export const createState = createAsyncThunk('state/createState', async (stateData) => {
  try{
    const response = await StateServices.createState(stateData);
    return response;
  }catch(error){
     throw error;
  }
});

// Thunk to update an existing state
export const updateState = createAsyncThunk('state/updateState', async ({ id, stateData }) => {
  try{
    const response = await StateServices.updateState(id, stateData);
     return response;
  }catch(error){
    throw error;
  }
});

// Thunk to delete a state
export const deleteState = createAsyncThunk('state/deleteState', async (stateId) => {
   try{
    const response = await StateServices.deleteState(stateId);
    return response;
   }catch(error){

   }
});

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch states
      .addCase(fetchStates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle create state
      .addCase(createState.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createState.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(createState.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle update state
      .addCase(updateState.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateState.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex((state) => state._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateState.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle delete state
      .addCase(deleteState.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteState.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter((state) => state._id !== action.meta.arg);
      })
      .addCase(deleteState.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default stateSlice.reducer;
