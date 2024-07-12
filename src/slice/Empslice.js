import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  empdetails: null,
};

const empSlice = createSlice({
  name: 'emp',
  initialState,
  reducers: {
    setempdetails: (state, action) => {
      state.empdetails = action.payload;
    },
  },
});

export const { setempdetails } = empSlice.actions;

export default empSlice.reducer;
