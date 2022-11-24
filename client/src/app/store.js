import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './slices/mapSlice.js'

export const store = configureStore({
  reducer: {
    map: mapReducer,
  },
})