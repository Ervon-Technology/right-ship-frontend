// src/features/teamMembers/teamMembersSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  teamMembers: [],
  loading: false,
  error: null,
};

// Async thunk action creator for fetching team members
export const fetchTeamMembers = createAsyncThunk(
  'teamMembers/fetchTeamMembers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://65.0.167.98/team/list', {
        headers: {
          'Accept': '*/*',
          'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
          // Add any other headers needed
        },
      });

      console.log('Fetched Team Members:', response.data); // Log the fetched team members

      return response.data; // Return the fetched team members to be handled by reducer
    } catch (error) {
      console.error('Failed to fetch team members:', error); // Log the error

      return rejectWithValue(error.response.data); // Return the error data to be handled by reducer
    }
  }
);

// Async thunk action creator for adding a team member
export const addTeamMember = createAsyncThunk(
  'teamMembers/addTeamMember',
  async (newMemberData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://65.0.167.98/team/create', newMemberData, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
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
export const teamMembersSlice = createSlice({
  name: 'teamMembers',
  initialState,
  reducers: {
    // Define additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers.push(action.payload); // Assuming the API returns the added team member data
      })
      .addCase(addTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Assuming the API error response data is set as payload
      })
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers = action.payload; // Assuming the API returns the list of team members
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Assuming the API error response data is set as payload
      });
  },
});

// Export actions and reducer
export const { } = teamMembersSlice.actions; // No additional synchronous actions defined in this example

export default teamMembersSlice.reducer;
