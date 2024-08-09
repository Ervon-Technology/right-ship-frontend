// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import empslice from './company/Slice/Empslice';
import otpReducer from './features/otpSlice';
import contactReducer from './features/contactSlice';
import employeeRegistrationReducer from './features/employeeRegistrationSlice';

const store = configureStore({
  reducer: {
    emp: empslice,
    otp: otpReducer,
    contact: contactReducer,
    employee: employeeRegistrationReducer,
  },
});

export default store;
