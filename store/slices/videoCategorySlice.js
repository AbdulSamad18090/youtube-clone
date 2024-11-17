import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// Async thunk to fetch video categories
export const fetchVideoCategories = createAsyncThunk(
  "videoCategories/fetchVideoCategories",
  async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=PK&key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch video categories");
      }
      const data = await response.json();
      return data.items.map((category) => category.snippet.title);
    } catch (error) {
      throw error.message || "Something went wrong";
    }
  }
);

const videoCategorySlice = createSlice({
  name: "videoCategories",
  initialState: {
    categories: ["All"], // Default category
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = ["All", ...action.payload];
      })
      .addCase(fetchVideoCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const videoCategoriesReducer = videoCategorySlice.reducer;
