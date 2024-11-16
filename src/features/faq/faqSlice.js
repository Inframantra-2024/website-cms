import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FaqCategoryServices from "../../services/faqServices";


const initialState = {
    data: null,
    status: 'idle',
    error: null,
};


export const fetchFaq = createAsyncThunk('/faqCategory/fetchCategory', async()=>{
    try {
        const response = await FaqCategoryServices.getFaq();
        console.log("Fetch Faq",response);
        return response;
      } catch (error) {
        throw error;
      }
})

export const createFaq = createAsyncThunk('developer/createCategory', async (FaqCategoryData) => {
    try {
      const response = await FaqCategoryServices.createFaq(FaqCategoryData);
      return response;
    } catch (error) {
      throw error;
    }
  });

  // Thunk to update an existing Category
export const updateFaq = createAsyncThunk('developer/updateFaqCategory', async ({ id, FaqCategoryData }) => {
    try {
      const response = await FaqCategoryServices.updateFaq(id, FaqCategoryData);
      return response;
    } catch (error) {
      throw error;
    }
  });

// Thunk to delete a developer
export const deleteFaq = createAsyncThunk('developer/deleteFaqCategory', async (developerId) => {
    try {
      const response = await FaqCategoryServices.deleteFaq(developerId);
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
           .addCase(fetchFaq.pending, (state)=>{
            state.status = 'loading';
           })
           .addCase(fetchFaq.fulfilled,(state, action)=>{
            state.status = 'succeeded';
            state.data = action.payload;
           })
           .addCase(fetchFaq.rejected,(state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
           })
           .addCase(createFaq.pending, (state)=>{
             state.status= "loading";
           })
           .addCase(createFaq.fulfilled, (state,action)=>{
             state.status= "succeeded";
             state.data =action.payload;
           })
           .addCase(createFaq.rejected,(state, action)=>{
             state.status = "failed";
             state.data = action.error.message;
           })
           .addCase(updateFaq.pending,(state)=> {
             state.status = 'loading'
           })
           .addCase(updateFaq.fulfilled, (state, action)=>{
             state.status = 'succeeded';
             fetchFaq();
           })
           .addCase(updateFaq.rejected,(state,action)=>{
             state.status = 'failed';
             state.data = action.error.message;
           })
           .addCase(deleteFaq.pending,(state)=>{
             state.status = 'loading'
           })
           .addCase(deleteFaq.fulfilled,(state)=>{
             state.status = 'succeeded'
           })
           .addCase(deleteFaq.rejected,(state, action)=>{
               state.status = "failed"
               state.data = action.error.message;
           })
     }
  }) 


  export default CategorySlice.reducer;