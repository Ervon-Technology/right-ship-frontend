import { configureStore } from '@reduxjs/toolkit';
import empReducer from '../src/slice/Empslice';

const store = configureStore({
  reducer: {
    emp: empReducer,
  },
});

export default store;
