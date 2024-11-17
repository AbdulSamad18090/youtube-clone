import { configureStore } from "@reduxjs/toolkit";
import { trendingVideosReducer } from "./slices/trendingVideosSlice"; // Adjust path as needed
import { videoCategoriesReducer } from "./slices/videoCategorySlice";
import { HomePageVideosReducer } from "./slices/homePageVideosSlice";

// Configure the store
const store = configureStore({
  reducer: {
    homePageVideos: HomePageVideosReducer,
    videoCategories: videoCategoriesReducer,
    trendingVideos: trendingVideosReducer,
  },
});

export default store;
