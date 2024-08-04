// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import otpReducer from './features/otpSlice';
import contactReducer from './features/contactSlice';
import employeeRegistrationReducer from './features/employeeRegistrationSlice';

const store = configureStore({
  reducer: {
    otp: otpReducer,
    contact: contactReducer,
    employee: employeeRegistrationReducer,
  },
});

export default store;
