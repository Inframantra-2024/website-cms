import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FaqCategoryServices from "../../services/faqServices";


const initialState = {
    data: null,
    status: 'idle',
    error: null,
};


export const fetchFaqCategory = createAsyncThunk('/faqCategory/fetchCategory', async()=>{
    try {
        const response = await FaqCategoryServices.getFaqCategory();
        return response;
      } catch (error) {
        throw error;
      }
})

export const createCategory = createAsyncThunk('developer/createCategory', async (FaqCategoryData) => {
  console.log(FaqCategoryData);
    try {
      const response = await FaqCategoryServices.createFaqCategory(FaqCategoryData);
      return response;
    } catch (error) {
      throw error;
    }
  });

  // Thunk to update an existing Category
export const updateFaqCategory = createAsyncThunk('developer/updateFaqCategory', async ({ id, developerData }) => {
    try {
      const response = await FaqCategoryServices.updateFaqCategory(id, developerData);
      return response;
    } catch (error) {
      throw error;
    }
  });

// Thunk to delete a developer
export const deleteFaqCategory = createAsyncThunk('developer/deleteFaqCategory', async (developerId) => {
    try {
      const response = await FaqCategoryServices.deleteFaqCategory(developerId);
      return response;
    } catch (error) {
      throw error;
    }
  });

  const CategorySlice = createSlice({
     name: 'faqCategory',
     initialState,
     reducers:{},
     extraReducers: (builder)=>{
         builder 
         // Handle fetch data
           .addCase(fetchFaqCategory.pending, (state)=>{
            state.status = 'loading';
           })
           .addCase(fetchFaqCategory.fulfilled,(state, action)=>{
            state.status = 'succeeded';
            state.data = action.payload;
           })
           .addCase(fetchFaqCategory.rejected,(state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
           })
           .addCase(createCategory.pending, (state)=>{
             state.status= "loading";
           })
           .addCase(createCategory.fulfilled, (state,action)=>{
             state.status= "succeeded";
             state.data =action.payload;
           })
           .addCase(createCategory.rejected,(state, action)=>{
             state.status = "failed";
             state.data = action.error.message;
           })
           .addCase(updateFaqCategory.pending,(state)=> {
             state.status = 'loading'
           })
           .addCase(updateFaqCategory.fulfilled, (state, action)=>{
             state.status = 'succeeded';
            fetchFaqCategory();
           })
           .addCase(updateFaqCategory.rejected,(state,action)=>{
             state.status = 'failed';
             state.data = action.error.message;
           })
           .addCase(deleteFaqCategory.pending,(state)=>{
             state.status = 'loading'
           })
           .addCase(deleteFaqCategory.rejected,(state, action)=>{
               state.status = "failed"
               state.data = action.error.message;
           })
     }
  }) 


  export default CategorySlice.reducer;