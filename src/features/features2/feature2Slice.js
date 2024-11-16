import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CityServices from '../../services/feature2api';

const initialState = {
    data: null,
    status: 'idle',
    error: null,
};

// Thunk to fetch city data
export const fetchFeature2Data = createAsyncThunk('feature2/fetchData', async () => {
    try {
        const response = await CityServices.getCity();
        return response;
    } catch (error) {
        throw error;
    }
});

// Thunk to create a new city
export const createCity = createAsyncThunk('feature2/createCity', async (cityData) => {
    try {
        const response = await CityServices.createCity(cityData);
        return response;
    } catch (error) {
        throw error;
    }
});

// Thunk to update an existing city
export const updateCity = createAsyncThunk('feature2/updateCity', async ({ id, cityData }) => {
    try {
        const response = await CityServices.updateCity(id, cityData);
        return response;
    } catch (error) {
        throw error;
    }
});
// Thunk to delete a city
export const deleteCity = createAsyncThunk('feature2/deleteCity', async (cityId) => {
    try {
        const response = await CityServices.deleteCity(cityId);
        return response;
    } catch (error) {
        throw error;
    }
});

const feature2Slice = createSlice({
    name: 'feature2',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetch data
            .addCase(fetchFeature2Data.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFeature2Data.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchFeature2Data.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Handle create city
            .addCase(createCity.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createCity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = [...state.data, action.payload];
            })
            .addCase(createCity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Handle update city
            .addCase(updateCity.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = state.data.map((city) =>
                    city._id === action.payload._id ? action.payload : city
                );
            })
            .addCase(updateCity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Handle delete city
            .addCase(deleteCity.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Set state.data to the updated array without the deleted city
                // state.data =
                // return fetchFeature2Data.fulfilled(action.payload); 
            })
            .addCase(deleteCity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default feature2Slice.reducer;
