// ✅ authSlice.js – Fully Implemented with Comments for Clarity and Maintainability
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

// ✅ Configure axios to include cookies (for sessions)
axios.defaults.withCredentials = true;

// TODO: Implement checkAuthStatus thunk
export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      // ✅ Check if user is still authenticated by hitting the backend
      const response = await axios.get(`${BASE_URL}/auth/check`);
      return response.data; // { user: {...} }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Check failed");
    }
  }
);

// TODO: Implement login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      // ✅ Send credentials to backend to log in user
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      return response.data; // { user: {...} }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// TODO: Implement register thunk
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      // ✅ Send user registration data to backend
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      return response.data; // { user: {...} }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// TODO: Implement logout thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // ✅ Log out user from backend (destroy session)
      await axios.post(`${BASE_URL}/auth/logout`);
      return true; // Return success flag
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// ✅ Initial state for auth
const initialState = {
  user: null,             // Logged-in user info
  isAuthenticated: false, // Whether the user is logged in
  loading: true,          // Auth check loading indicator
  error: null,            // Auth-related error messages
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Clear error from state
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ✅ checkAuthStatus cases
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // ✅ login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ register cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ logout cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export clearError action
export const { clearError } = authSlice.actions;

// ✅ Export the reducer
export default authSlice.reducer;
