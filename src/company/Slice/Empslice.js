import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  empdetails: null,
  shipTypes: [],
  ranks: [],
  description: '',
  benefits: [],
  title: '',
};

const empSlice = createSlice({
  name: 'emp',
  initialState,
  reducers: {
    setEmpDetails: (state, action) => {
      state.empdetails = action.payload;
    },
    addShipType: (state, action) => {
      state.shipTypes.push(action.payload);
    },
    removeShipType: (state, action) => {
      state.shipTypes = state.shipTypes.filter(type => type !== action.payload);
    },
    addRank: (state, action) => {
      state.ranks.push(action.payload);
    },
    removeRank: (state, action) => {
      state.ranks = state.ranks.filter(rank => rank !== action.payload);
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    addBenefit: (state, action) => {
      state.benefits.push(action.payload);
    },
    removeBenefit: (state, action) => {
      state.benefits = state.benefits.filter(benefit => benefit !== action.payload);
    },
    updateJobData: (state, action) => {
      const { shipTypes, rankTypes, benefits, description, jobTitle } = action.payload;
      state.shipTypes = shipTypes;
      state.ranks = rankTypes;
      state.benefits = benefits;
      state.description = description;
      state.title = jobTitle;
    },
  },
});

export const { setEmpDetails, addShipType, removeShipType, addRank, removeRank, setDescription, setTitle, addBenefit, removeBenefit, updateJobData } = empSlice.actions;

export default empSlice.reducer;
