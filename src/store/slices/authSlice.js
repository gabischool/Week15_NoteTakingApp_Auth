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
      const response = await axios.get(`${BASE_URL}/auth/check`);
      return response.data.user;
    } catch (error) {
      throw error;
    }
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
      return response.data.user;
    } catch (error) {
      throw error;
    }
  }
);

// TODO: Implement register thunk
export const Register = createAsyncThunk(
  "auth/Register",
  async (userData, { rejectWithValue }) => {
    // TODO: Implement registration functionality
    // 1. Make a POST request to /auth/register with userData
    // 2. Return the response data
    // 3. Handle errors appropriately
    try {
      const response = await axios.post(`${BASE_URL}/auth/Register`, userData);
      return response.data.user;
    } catch (error) {
      throw error;
    }

  }
);

// TODO: Implement logout thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    // TODO: Implement logout functionality
    // 1. Make a POST request to /auth/logout
    // 2. Handle errors appropriately
    await axios.post(`${BASE_URL}/auth/logout`);
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
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
    builder;
    // TODO: Add cases for checkAuthStatus

    builder
   .addCase(checkAuthStatus.pending, (state) => {
      state.status= "loading";
    })
    .addCase(checkAuthStatus.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(checkAuthStatus.rejected, (state, action) => {
      state.status = "failed";
      state.user = null;
      state.isAuthenticated = false;
    })


    // TODO: Add cases for login
    builder
    .addCase(login.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase(login.rejected, (state) => {
      state.status = "failed";
      state.error = action.error.message;
    })

    // TODO: Add cases for register
    builder
    .addCase(Register.pending, (state) => {
      state.status = "loading";
      state.userull;
    })
    .addCase(Register.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(Register.rejected, (state) => {
      state.status = "failed";
      state.error=action.error.message;
    })

    // TODO: Add cases for logout
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
        state.error = null;
      })
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
