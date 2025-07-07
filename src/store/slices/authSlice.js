import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

axios.defaults.withCredentials = true;

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/check`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to check auth status.");
    }
  }
);

// ✅ Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, credentials);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed.");
    }
  }
);

// ✅ Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed.");
    }
  }
);

// ✅ Logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`);
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Logout failed.");
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "Idle",
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
    builder
      // 🔄 Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = "success";
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.status = "fail";
        state.isAuthenticated = false;
        state.user = null;
      })

      // 🔐 Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "fail";
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // 📝 Register
      .addCase(registerUser.pending, (state) => {
        state.status = "laoding";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "fail";
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // 🚪 Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
