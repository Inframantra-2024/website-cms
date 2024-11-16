import { createSlice } from '@reduxjs/toolkit';

const loadInitialState = () => {
  const storedData = JSON.parse(localStorage.getItem('feature1Data'));
  if (storedData) {
    return {
      data: storedData,
      status: 'idle',
    };
  } else {
    return {
      data: [
        { id: 1, name: 'Feature 1 Item 1' },
        { id: 2, name: 'Feature 1 Item 2' },
        { id: 3, name: 'Feature 1 Item 3' },
        { id: 4, name: 'Feature 1 Item 4' },
        { id: 5, name: 'Feature 1 Item 5' },
      ],
      status: 'idle',
    };
  }
};

const feature1Slice = createSlice({
  name: 'feature1',
  initialState: loadInitialState(),
  reducers: {
    fetchDataSuccess(state, action) {
      state.data = action.payload;
      state.status = 'succeeded';
    },
    fetchDataFailure(state, action) {
      state.status = 'failed';
    },
    addItem(state, action) {
      state.data.push(action.payload);
    },
    updateItem(state, action) {
      const { id, name } = action.payload;
      const existingItem = state.data.find((item) => item.id === id);
      if (existingItem) {
        existingItem.name = name;
      }
    },
    deleteItem(state, action) {
      const id = action.payload;
      state.data = state.data.filter((item) => item.id !== id);
    },
  },
});

export const {
  fetchDataSuccess,
  fetchDataFailure,
  addItem,
  updateItem,
  deleteItem,
} = feature1Slice.actions;

export default feature1Slice.reducer;
