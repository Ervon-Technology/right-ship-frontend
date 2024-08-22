// src/features/contactSlice.js
import { createSlice } from '@reduxjs/toolkit';

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contactInfo: null, // This will store the phone number or email
  },
  reducers: {
    setContactInfo: (state, action) => {
      state.contactInfo = action.payload;
    },
  },
});

export const { setContactInfo } = contactSlice.actions;
export default contactSlice.reducer;

