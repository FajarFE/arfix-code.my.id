import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

import { login, logout, user } from "./api";

export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { getState }) => {
  const { token } = getState().auth;
  try {
    const response = await user.get("/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});

export const loginAsync = createAsyncThunk("auth/login", async (data, { getState }) => {
  const { token } = getState().auth;
  try {
    const response = await login.post("/", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});

export const registerAsync = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password, passwordConfirmation }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const logoutAsync = createAsyncThunk("auth/logout", async (data, { getState }) => {
  const { token } = getState().auth;
  try {
    const response = await logout.post("/", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    token: null,
    loading: false,
    error: null,
    success: false,
    isTokenExpired: true,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    checkTokenExpiration: (state) => {
      if (state.token) {
        const currentTime = Date.now() / 1000;
        const decodedToken = jwtDecode(state.token);
        state.isTokenExpired = decodedToken.exp <= currentTime;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setToken, checkTokenExpiration } = authSlice.actions;

export default authSlice.reducer;
