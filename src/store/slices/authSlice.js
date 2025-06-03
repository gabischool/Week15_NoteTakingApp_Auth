import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

// Configure axios to include credentials
axios.defaults.withCredentials = true;

// TODO: Implement checkAuthStatus thunk
export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {

     try {
      const response = await axios.get(`${BASE_URL}/auth/check`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Check failed");
    }
    // TODO: Implement authentication status check
    // 1. Make a GET request to /auth/check
    // 2. Return the response data
    // 3. Handle errors appropriately
  }
);

// TODO: Implement login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {

    // TODO: Implement login functionality
    // 1. Make a POST request to /auth/login with credentials
    // 2. Return the response data
    // 3. Handle errors appropriately
     try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// TODO: Implement register thunk
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {

      try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Register failed");
    }
    // TODO: Implement registration functionality
    // 1. Make a POST request to /auth/register with userData
    // 2. Return the response data
    // 3. Handle errors appropriately
  }
);

// TODO: Implement logout thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
     try {
      await axios.post(`${BASE_URL}/auth/logout`);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
    // TODO: Implement logout functionality
    // 1. Make a POST request to /auth/logout
    // 2. Handle errors appropriately
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
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
    // Check Auth
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;