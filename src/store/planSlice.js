// store/planSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPlans = createAsyncThunk('plans/fetchPlans', async () => {
  try {
    const response = await fetch('http://65.0.167.98/subscription/get', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch plans: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    throw new Error(`Error fetching subscription plans: ${error.message}`);
  }
});


export const createPlan = createAsyncThunk('plans/createPlan', async (planData, { dispatch }) => {
  const response = await fetch('http://65.0.167.98/subscription/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(planData),
  });

  if (response.ok) {
    await dispatch(fetchPlans());
  } else {
    throw new Error('Failed to create subscription plan');
  }
});

const planSlice = createSlice({
  name: 'plans',
  initialState: {
    plans: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Selector function to get plans state
export const selectPlans = (state) => state.plans;

export default planSlice.reducer;
