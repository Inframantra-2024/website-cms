// authSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LogInServices from '../../services/authService';

const initialState = {
  data: null,
  user: null,
  error: null
};

export const logInUser = createAsyncThunk('/user/login', async (loginData) => {
  try {
    const response = await LogInServices.getLogIn(loginData);
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(response.data));
    localStorage.setItem('userRoles', JSON.stringify(response.data.data.roles))
    // Set 'isAuthenticated' to true
    localStorage.setItem('isAuthenticated', 'true');
    return response.data;
  } catch (error) {
    throw error;
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});


export default authSlice;
