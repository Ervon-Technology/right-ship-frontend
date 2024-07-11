// src/redux/slices/planSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  plans: [],
  loading: false,
  error: null,
};

export const fetchPlans = createAsyncThunk(
    'plans/fetchPlans',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://65.0.167.98/subscription/get', {
          headers: {
            'Accept': '*/*',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
            'Content-Type': 'application/json',
            // Add any other headers needed
          },
        });
  
        console.log('Fetched Plans:', response.data); // Log the fetched plans
  
        return response.data; // Return the fetched plans to be handled by reducer
      } catch (error) {
        console.error('Failed to fetch plans:', error); // Log the error
  
        return rejectWithValue(error.response.data); // Return the error data to be handled by reducer
      }
    }
  );
  

// Async thunk action creator for adding a plan
export const addPlan = createAsyncThunk(
  'plans/addPlan',
  async (newPlanData, { rejectWithValue }) => {
    try {
      // Adjust headers and other configurations as needed
      const response = await axios.post('http://65.0.167.98/subscription/create', newPlanData, {
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers needed
        },
      });

      console.log('API Response:', response.data); // Log the response data

      return response.data; // Return the response data to be handled by reducer
    } catch (error) {
      console.error('API Error:', error.response.data); // Log the error response data

      return rejectWithValue(error.response.data); // Return the error data to be handled by reducer
    }
  }
);

// Create slice with reducers and initial state
export const planSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    // Define additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plans.push(action.payload); // Assuming the API returns the added plan data
      })
      .addCase(addPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Assuming the API error response data is set as payload
      });
  },
});

// Export actions and reducer
export const { } = planSlice.actions; // No additional synchronous actions defined in this example

export default planSlice.reducer;
