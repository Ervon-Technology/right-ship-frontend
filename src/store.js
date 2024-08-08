// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import otpReducer from './features/otpSlice';
import contactReducer from './features/contactSlice';
import employeeRegistrationReducer from './features/employeeRegistrationSlice';
// import jobsReducer from './features/jobs/jobsSlice';

const store = configureStore({
  reducer: {
    otp: otpReducer,
    contact: contactReducer,
    employee: employeeRegistrationReducer,
    // jobs: jobsReducer,
  },
});

export default store;
