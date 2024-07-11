import { configureStore } from '@reduxjs/toolkit';
// import empreducer from './slice/Empslice'; // Replace with your root reducer file
import planReducer from './store/planSlice';

const store = configureStore({
  reducer: {
    plans: planReducer,
  },
});

export default store;
