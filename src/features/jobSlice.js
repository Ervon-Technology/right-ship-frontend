import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to apply a job
export const applyJobToCompany = createAsyncThunk(
  'job/applyJobToCompany',
  async ({ jobId, companyId, employeeId }, { rejectWithValue }) => {
    try {
      console.log('Applying for Job:', { jobId, companyId, employeeId });  // Debugging line
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employee/apply_job`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_id: employeeId,
          application_id: jobId,
          company_id: companyId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to apply for the job');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Apply Job Error:', error);  // Debugging line
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to unapply a job
export const unapplyJobFromCompany = createAsyncThunk(
  'job/unapplyJobFromCompany',
  async ({ jobId, companyId, employeeId }, { rejectWithValue }) => {
    try {
      console.log('Unapplying from Job:', { jobId, companyId, employeeId });  // Debugging line
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employee/unapply`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_id: employeeId,
          application_id: jobId,
          company_id: companyId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to unapply for the job');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Unapply Job Error:', error);  // Debugging line
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  savedJobs: JSON.parse(localStorage.getItem('savedJobs')) || [],
  appliedJobs: JSON.parse(localStorage.getItem('appliedJobs')) || [],
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    applyJob: (state, action) => {
      const job = action.payload;
      if (!state.appliedJobs.some(appliedJob => appliedJob.id === job.id)) {
        state.appliedJobs.push(job);
        localStorage.setItem('appliedJobs', JSON.stringify(state.appliedJobs));
      }
    },
    unapplyJob: (state, action) => {
      const jobId = action.payload;
      state.appliedJobs = state.appliedJobs.filter(job => job.id !== jobId);
      localStorage.setItem('appliedJobs', JSON.stringify(state.appliedJobs));
    },
    bookmarkJob: (state, action) => {
      const job = action.payload;
      if (!state.savedJobs.some(savedJob => savedJob.id === job.id)) {
        state.savedJobs.push(job);
        localStorage.setItem('savedJobs', JSON.stringify(state.savedJobs));
      }
    },
    removeJob: (state, action) => {
      const jobId = action.payload;
      state.savedJobs = state.savedJobs.filter(job => job.id !== jobId);
      localStorage.setItem('savedJobs', JSON.stringify(state.savedJobs));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(applyJobToCompany.fulfilled, (state, action) => {
      console.log('Job applied successfully:', action.payload);
    });
    builder.addCase(applyJobToCompany.rejected, (state, action) => {
      console.error('Failed to apply job:', action.payload);
    });
    builder.addCase(unapplyJobFromCompany.fulfilled, (state, action) => {
      console.log('Job unapplied successfully:', action.payload);
    });
    builder.addCase(unapplyJobFromCompany.rejected, (state, action) => {
      console.error('Failed to unapply job:', action.payload);
    });
  },
});

export const { applyJob, unapplyJob, bookmarkJob, removeJob } = jobSlice.actions;

export default jobSlice.reducer;
