// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import Empslice from './company/Slice/Empslice';

const store = configureStore({
  reducer: {
    Emp: Empslice,
  },
});

export default store;
