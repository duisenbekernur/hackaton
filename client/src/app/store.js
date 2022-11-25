import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./slices/mapSlice.js";
import { authReducer } from "./slices/authSlice.js";

export const store = configureStore({
  reducer: {
    map: mapReducer,
    auth: authReducer,
  },
});
