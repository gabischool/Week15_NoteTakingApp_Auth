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
    try{
      const response = await axios.get(`${BASE_URL}/auth/check`)
      return response.data

    }catch(error) {
      throw error
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
    try{
      const response = await axios.post(`${BASE_URL}/auth/login`,credentials)
      return response.data.credentials

    }catch(error) {
      if(error.response?.data?.error) {
        throw error(error.response.data.error);
      }
      throw error;
    }
  
  }
);

// TODO: Implement register thunk
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    // TODO: Implement registration functionality
    // 1. Make a POST request to /auth/register with userData
    // 2. Return the response data
    // 3. Handle errors appropriately
    try{
      const response = await axios.post(`${BASE_URL}/auth/regester`, userData)
      return response.data.user

    }catch(error) {
      if(error.response?.data?.error) {
        throw(error.response.data.error)
      }
      throw error
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
    
    await axios.post(`${BASE_URL}/auth/logout`)
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
    builder
    // TODO: Add cases for checkAuthStatus
    .addCase(checkAuthStatus.pending,(state) => {
      state.status= "loading"
    })
    .addCase(checkAuthStatus.fulfilled,(state , action) => {
      state.status="successfull"
      state.isAuthenticated= "true"
      state.user= action.payload
      state.error="null"
    })
    .addCase(checkAuthStatus.rejected,(state) => {
      state.status= "idle"
      state.isAuthenticated="false"
      state.user= "null"
    })
    // TODO: Add cases for login
    .addCase(login.pending,(state) => {
      state.status= "loading"
    })
    .addCase(login.fulfilled,(state , action) => {
      state.status="successfull"
      state.isAuthenticated= "true"
      state.user= action.payload
      state.error="null"
    })
    .addCase(login.rejected,(state,action) => {
      state.status= "failed"
      state.error= action.error.message
    })
    // TODO: Add cases for register
    .addCase(register.pending,(state) => {
      state.status= "loading"
    })
    .addCase(register.fulfilled,(state , action) => {
      state.status="successfull"
      state.isAuthenticated= "true"
      state.user= action.payload
      state.error="null"
    })
    .addCase(register.rejected,(state,action) => {
      state.status= "failed"
      state.isAuthenticated="false"
      state.user= "null"
      state.error= action.error.message
    })
    // TODO: Add cases for logout
    
    .addCase(logout.fulfilled,(state , action) => {
      state.status="idle"
      state.isAuthenticated= "false"
      state.user= action.payload
      state.error="null"
      state.user= "null"
    })
    
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
