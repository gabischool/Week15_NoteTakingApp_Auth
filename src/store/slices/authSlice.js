import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

// Configure axios to include credentials
axios.defaults.withCredentials = true;

// TODO: Implement checkAuthStatus thunk
export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    // TODO: Implement authentication status check
    // 1. Make a GET request to /auth/check
    // 2. Return the response data
    // 3. Handle errors appropriately
    try {
      const response = await axios.get(`${BASE_URL}/auth/check`)
      return response.data.user;
    }
    catch (error) {
      return rejectWithValue(
        error.response?.data?.message
      );
    }
  });
// TODO: Implement login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    // TODO: Implement login functionality
    // 1. Make a POST request to /auth/login with credentials
    // 2. Return the response data
    // 3. Handle errors appropriately
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials)
      return response.data.user;
    }
    catch (error) {
      return rejectWithValue(
        error.response?.data?.message
      );
    }
  });

// TODO: Implement register thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    // TODO: Implement registration functionality
    // 1. Make a POST request to /auth/register with userData
    // 2. Return the response data
    // 3. Handle errors appropriately
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData)
    console.log(`${BASE_URL}/auth/register`);
      return response.data.user;
    }
    catch (error) {
      return rejectWithValue(
        error.response?.data?.message
      );
    }
  });

// TODO: Implement logout thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    // TODO: Implement logout functionality
    // 1. Make a POST request to /auth/logout
    // 2. Handle errors appropriately
    try {
      const response = await axios.post(`${BASE_URL}/auth/logout`)
    }
    catch (error) {
      return rejectWithValue(
        error.response?.data?.message
      );
    }
  });


const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  status:"idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // TODO: Add cases for checkAuthStatus    

      .addCase(checkAuthStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.user = null;
      })

      // TODO: Add cases for login
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // TODO: Add cases for register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // TODO: Add cases for logout
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      });
  },
});


export const { clearError } = authSlice.actions;
export default authSlice.reducer;
