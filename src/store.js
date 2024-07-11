// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import planSlice from './slice/planSlice';
import teamMembersReducer from './slice/teammember';

const store = configureStore({
  reducer: {
    plans: planSlice,
    teamMembers: teamMembersReducer,
    // Add other reducers here if any
  },
});

export default store;
