import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coords:{
        lat: null,
        lng: null
    }
}

const mapSlice = createSlice({
    name: "mapReducer",
    initialState,
    reducers: {
        addCords: (state,action) => {
            state.coords = action.payload;
        }
    }
})

export const {addCords} = mapSlice.actions;

export default mapSlice.reducer;