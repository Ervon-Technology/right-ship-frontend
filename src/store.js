// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import empslice from './company/Slice/Empslice';

const store = configureStore({
  reducer: {
    emp: empslice,
  },
});

export default store;
