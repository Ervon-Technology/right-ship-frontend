// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import otpReducer from './features/otpSlice';
import contactReducer from './features/contactSlice';

const store = configureStore({
  reducer: {
    otp: otpReducer,
    contact: contactReducer,
  },
});

export default store;
