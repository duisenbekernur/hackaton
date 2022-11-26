import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../../axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const { data } = await axios.get("/products/goods");
    return data;
  }
);

const initialState = {
  data: [],
  status: "loading",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "loading";
      state.data = [];
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchProducts.rejected]: (state) => {
      state.status = "error";
      state.data = [];
    },
  },
});

export const getProducts = (state) => {
  return state.product.data;
};

export const productReducer = productSlice.reducer;
