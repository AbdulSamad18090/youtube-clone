import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export const fetchHomePageVideos = createAsyncThunk(
    "videos/HomePage",
    async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&regionCode=PK&maxResults=50&type=video&key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const searchData = await response.json();
  
        const videoIds = searchData.items.map((item) => item.id.videoId).join(",");
        const channelIds = searchData.items
          .map((item) => item.snippet.channelId)
          .join(",");
  
        const statsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${apiKey}`
        );
        if (!statsResponse.ok) {
          throw new Error("Failed to fetch video statistics");
        }
        const statsData = await statsResponse.json();
  
        const channelsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${apiKey}`
        );
        if (!channelsResponse.ok) {
          throw new Error("Failed to fetch channel details");
        }
        const channelsData = await channelsResponse.json();
  
        const channelImageMap = channelsData.items.reduce((map, channel) => {
          map[channel.id] = channel.snippet.thumbnails.default.url;
          return map;
        }, {});
  
        const allVideos = searchData.items.map((item) => {
          const stats = statsData.items.find((stat) => stat.id === item.id.videoId);
          return {
            id: item.id.videoId,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails.medium.url,
            publishedAt: item.snippet.publishedAt,
            viewCount: stats?.statistics?.viewCount || 0,
            duration: stats?.contentDetails?.duration || "N/A",
            channelImage: channelImageMap[item.snippet.channelId] || "",
          };
        });
  
        // Separate Shorts and Videos
        const shorts = allVideos.filter((video) => {
          const duration = video.duration; // Example: "PT59S" or "PT1M30S"
          const seconds = convertDurationToSeconds(duration);
          return seconds < 60;
        });
  
        const videos = allVideos.filter((video) => {
          const duration = video.duration;
          const seconds = convertDurationToSeconds(duration);
          return seconds >= 60;
        });
  
        return { shorts, videos };
      } catch (error) {
        throw error.message || "Something went wrong";
      }
    }
  );
  
  // Helper Function: Convert ISO 8601 duration to seconds
  function convertDurationToSeconds(duration) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const [, hours = 0, minutes = 0, seconds = 0] = regex.exec(duration) || [];
    return +hours * 3600 + +minutes * 60 + +seconds;
  }
  
  
  

// Define the slice
const HomePageVideosSlice = createSlice({
    name: "homePageVideos",
    initialState: {
      shorts: [],
      videos: [],
      error: null,
      loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchHomePageVideos.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchHomePageVideos.fulfilled, (state, action) => {
          state.loading = false;
          state.shorts = action.payload.shorts;
          state.videos = action.payload.videos;
        })
        .addCase(fetchHomePageVideos.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export const HomePageVideosReducer = HomePageVideosSlice.reducer;
  