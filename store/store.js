import { configureStore } from "@reduxjs/toolkit";
import { videosReducer } from "./slices/videosSlice"; // Adjust path as needed

// Configure the store
const store = configureStore({
  reducer: {
    videos: videosReducer,
  },
});

export default store;
