import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login/", params);
  return data;
});

export const fetchMe = createAsyncThunk("auth/fetchMe", async ({ id }) => {
  const { data } = await axios.get(`/auth/account/${id}`);
  return data;
});

const initialState = {
  data: null,
  user: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuth.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchMe.pending]: (state) => {
      state.status = "loading";
      state.user = null;
    },
    [fetchMe.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "loaded";
    },
    [fetchMe.rejected]: (state) => {
      state.status = "error";
      state.user = null;
    },
  },
});

export const selectIsLogged = (state) =>
  Boolean(state.auth.data?.message === "Login Successfull");

export const userId = (state) => {
  return state.auth.data?.id;
};

export const user = (state) => {
  return state.auth.user;
};

export const authReducer = authSlice.reducer;
