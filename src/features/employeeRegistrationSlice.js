import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerEmployee = createAsyncThunk(
  'employee/registerEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://api.rightships.com/employee/register', employeeData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const employeeRegistrationSlice = createSlice({
  name: 'employee',
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: {
      name: '',
      mobile_no: '',
      whatsappNumber: '',
      gender: '',
      country: '',
      email: '',
      dob: '',
      availability: '',
      experience: '',
      resume: ''
    }
  },
  reducers: {
    updateData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerEmployee.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerEmployee.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(registerEmployee.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  }
});

export const { updateData } = employeeRegistrationSlice.actions;
export default employeeRegistrationSlice.reducer;
