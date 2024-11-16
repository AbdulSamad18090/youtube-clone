"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Header from "../Header/header";
import { MoreVertical } from "lucide-react";
import { fetchVideos } from "@/store/slices/videosSlice";
import { useDispatch, useSelector } from "react-redux";

export default function YoutubeHome() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const categories = [
    "All",
    "JavaScript",
    "Benches",
    "Music",
    "Weight",
    "Protein",
    "Jukebox",
    "Reverberation",
    "Mixes",
    "Shilpa Rao",
    "Chill-out music",
    "Gaming",
  ];

  const subscriptions = [
    {
      name: "0pAMIR GAMING",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "Kk music",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "SR Lofi",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  const dispatch = useDispatch();

  // Select the videos slice from the Redux store
  const { data, loading, error } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchVideos()); // Dispatch the async thunk to fetch videos
  }, [dispatch]);

  console.log("Data =>", data);

  function convertTime(duration) {
    // Extract hours, minutes, and seconds from the ISO 8601 duration format (e.g., "PT15S", "PT1M", "PT15M16S")
    const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    const matches = duration.match(regex);

    if (!matches) {
      return null; // If the format is incorrect, return null
    }

    // Extract hours, minutes, and seconds (if they exist) from the matched groups
    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
    const seconds = matches[3] ? parseInt(matches[3], 10) : 0;

    // Format time to ensure two digits for minutes and seconds
    const formattedTime = [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");

    return formattedTime;
  }

  function formatNumber(number) {
    if (number >= 1_000_000_000) {
      return (number / 1_000_000_000).toFixed(1) + "B"; // Billion
    } else if (number >= 1_000_000) {
      return (number / 1_000_000).toFixed(1) + "M"; // Million
    } else if (number >= 1_000) {
      return (number / 1_000).toFixed(1) + "K"; // Thousand
    } else {
      return number.toString(); // No formatting needed for numbers less than 1000
    }
  }

  function timeAgo(timestamp) {
    const now = new Date();
    const pastDate = new Date(timestamp);

    const seconds = Math.floor((now - pastDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Approximate month length
    const years = Math.floor(months / 12);

    if (years > 0) {
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }
    if (months > 0) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    }
    if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    }
    if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    }
    if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }
    return seconds <= 10 ? "Just now" : `${seconds} seconds ago`;
  }

  // Optional: handle loading and error states for better UX
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white">
          <ScrollArea className="w-full whitespace-nowrap border-b">
            <div className="flex w-full gap-2 p-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "secondary" : "ghost"
                  }
                  className="rounded-lg px-3 py-1"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.items?.map((video) => (
            <div key={video.id} className="group relative">
              <div className="relative">
                <img
                  src={video?.snippet?.thumbnails?.standard?.url}
                  alt={`Thumbnail for ${video.title}`}
                  className="aspect-video w-full rounded-xl object-cover"
                />
                <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-xs text-white">
                  {convertTime(video?.contentDetails?.duration)}
                </div>
              </div>
              <div className="mt-3 flex gap-3">
                <Avatar className="h-9 w-9 rounded-full">
                  <AvatarImage
                    src={video.avatar}
                    alt={`${video.channel} avatar`}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold leading-tight line-clamp-2">
                    {video?.snippet?.localized?.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                    <span>{video?.snippet?.channelTitle}</span>
                    {video.verified && (
                      <svg className="h-4 w-4 fill-current" viewBox="0 24">
                        <path d="M12 2C6.5 2 6.5 12s4.5 10 10-4.5 10-10S17.5 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span>
                      {formatNumber(video?.statistics?.viewCount)} views
                    </span>
                    <span>•</span>
                    <span>{timeAgo(video?.snippet?.publishedAt)}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="invisible rounded-full group-hover:visible"
                >
                  <MoreVertical className="h-5 w-5" />
                  <span className="sr-only">More options</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
