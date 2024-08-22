import { configureStore } from '@reduxjs/toolkit';
import empslice from './company/Slice/Empslice';
import otpReducer from './features/otpSlice';
import contactReducer from './features/contactSlice';
import employeeRegistrationReducer from './features/employeeRegistrationSlice';
import jobReducer from './features/jobSlice';  // Import the job slice
import authReducer from './features/authSlice';

const store = configureStore({
  reducer: {

    emp: empslice,
    otp: otpReducer,
    contact: contactReducer,
    employee: employeeRegistrationReducer,
    job: jobReducer,  // Add job reducer to the store
    auth: authReducer,
  },
});

export default store;
