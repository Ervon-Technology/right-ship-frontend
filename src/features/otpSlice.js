// src/features/otpSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Async thunk for sending OTP
export const sendOtp = createAsyncThunk(
  'otp/sendOtp',
  async (contact, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.rightships.com/otp/send_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile_no: contact }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for verifying OTP
export const verifyOtp = createAsyncThunk(
  'otp/verifyOtp',
  async ({ contactInfo, otp }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.rightships.com/otp/verify_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile_no: contactInfo, otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to verify OTP');
      }

      const data = await response.json();
      if(!data.code===200){
        console.log('error')
        
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    status: 'idle',
    error: null,
    isLoggedIn: false, // Track login status
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.status = 'succeeded';
        toast.success('OTP sent successfully!');
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error(`Error sending OTP: ${action.payload}`);
      })
      .addCase(verifyOtp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.status = 'succeeded';
        toast.success('OTP verified successfully!');
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error(`Error verifying OTP: ${action.payload}`);
      });
  },
});

export default otpSlice.reducer;
