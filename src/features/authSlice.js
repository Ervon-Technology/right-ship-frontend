import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

// Async thunk to send OTP
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (contactInfo, { rejectWithValue }) => {
    try {
      console.log("=====>", contactInfo);
      const contactInfo = contactInfo.includes('@') ? { email: contactInfo } : { mobile_no: contactInfo } ;
      const response = await axios.post('https://api.rightships.com/send_otp', { contactInfo });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'An unexpected error occurred';
      return rejectWithValue(message);
    }
  }
);

// Async thunk to verify OTP
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ contactInfo, otp }, { rejectWithValue }) => {
    try {
      const contactInfo = contactInfo.includes('@') ? { email: contactInfo } : { mobile_no: contactInfo } ;
      const response = await axios.post('https://api.rightships.com/verify_otp', { contactInfo, otp });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to verify OTP';
      return rejectWithValue(message);
    }
  }
);

// Async thunk to register the user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://api.rightships.com/employee/update', userData);
      userData.role = "employee";
      return { user: userData, token: response.data.token };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

// Async thunk for employee login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("======>", credentials);
      const response = await axios.post('https://api.rightships.com/employee/login', credentials);
      console.log("======>", response);
      const { _id, name, profile_photo, mobile_no, email, presentRank } = response.data.employee;
      const user = { _id, name, profile_photo, mobile_no, email, role: "employee" };
      return { user, token: response.data.token };
    } catch (error) {
      const message = error.response?.data?.message || 'An unexpected error occurred';
      return rejectWithValue(message);
    }
  }
);

// Async thunk for company login
export const loginCompany = createAsyncThunk(
  'auth/login/company',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://api.rightships.com/company/login', credentials);
      console.log("======> 1", credentials);
      const { _id, company_id, mobile_no } = response.data.data;
      console.log("======> 2", response.data.data);
      const user = { _id, company_id, mobile_no, role: "company" };
      console.log("======> 2", user);
      return { user, token: response.data.token };
    } catch (error) {
      const message = error.response?.data?.message || 'An unexpected error occurred';
      return rejectWithValue(message);
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk('auth/logout', async () => {
  // Clear local storage
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  // Return a fulfilled action to trigger the logout reducer
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        // Store user and token in localStorage
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        // Store user and token in localStorage
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        // Store user and token in localStorage
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
