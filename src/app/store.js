// # Redux Toolkit store configuration
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { configureStore } from '@reduxjs/toolkit';
import feature1Reducer from '../features/features1/feature1Slice';
import feature2Reducer from '../features/features2/feature2Slice';
import projectReducer from '../features/project/projectSlice';
import statesReducer from '../features/state/statesSlice';
import developerReducer from '../features/developer/developerSlice';
import localityReducer from '../features/locality/localitySlice';
import subLocalityReducer from '../features/subLocality/subLocalitySlice';
import faqCategoryReducer from '../features/faqCategory/faqCategorySlice';
import faqReducer from '../features/faq/faqSlice';
import testimonialReducer from '../features/testimoials/testimonialSlice';

import authReducer from '../features/auth/authSlice';







const store = configureStore({
  reducer: {
    feature1: feature1Reducer,
    feature2: feature2Reducer,
    project: projectReducer,
    states: statesReducer,
    developer: developerReducer,
    locality: localityReducer,
    subLocality: subLocalityReducer,
    faqCategory: faqCategoryReducer,
    faq : faqReducer,
    testimonial: testimonialReducer,
    auth: authReducer
  },
});



export default store;
