import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=PK&maxResults=50&key=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch videos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error.message || "Something went wrong";
  }
});

// Define the slice
const videosSlice = createSlice({
  name: "videos",
  initialState: {
    data: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const videosReducer = videosSlice.reducer;
