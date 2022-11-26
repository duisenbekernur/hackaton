import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./slices/mapSlice.js";
import { authReducer } from "./slices/authSlice.js";
import { productReducer } from "./slices/getProducts.js";
import { searchReducer } from "./slices/searchProductSlice.js";

export const store = configureStore({
  reducer: {
    map: mapReducer,
    auth: authReducer,
    product: productReducer,
    search: searchReducer,
  },
});
