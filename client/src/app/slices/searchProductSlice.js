import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../../axios";

const initialState = {
  data: '',
  status: "loading",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeValue: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const search = (state) => {
  return state.search.data;
};

export const { changeValue } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
