import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [fetchPosts.pending]: (state) => {
        
    }
  }
});

// Action creators are generated for each case reducer function
// export const = authSlice.actions

export default authSlice.reducer;
