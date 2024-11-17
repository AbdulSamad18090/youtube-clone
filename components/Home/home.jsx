"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { convertTime, formatNumber, timeAgo } from "@/lib/utils/BasicUtils";
import { SiYoutubeshorts } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomePageVideos } from "@/store/slices/homePageVideosSlice";
import { fetchVideoCategories } from "@/store/slices/videoCategorySlice";
import VideoCard from "../VideoCard/VideoCard";
import ShortCard from "../ShortCard/ShortCard";

export default function YoutubeHome() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const dispatch = useDispatch();
  const { shorts, videos, loading, error } = useSelector(
    (state) => state.homePageVideos
  );
  const categoriesData = useSelector((state) => state.videoCategories);

  useEffect(() => {
    dispatch(fetchHomePageVideos());
    dispatch(fetchVideoCategories());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const firstSixVideos = videos.slice(0, 6);
  const remainingVideos = videos.slice(6);

  return (
    <main className="flex-1 overflow-y-auto">
      <ScrollArea className="w-full whitespace-nowrap p-1">
        <div className="flex w-full gap-2 p-2 sticky top-0 z-50">
          {categoriesData?.categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "" : "secondary"}
              className="rounded-lg px-3 py-1 h-8"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>

      {/* First Six Videos */}
      <section className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {firstSixVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* Shorts Section */}
      <section className="p-4">
        <h2 className="text-xl font-bold flex items-center gap-3 mb-3">
          <SiYoutubeshorts className="text-red-600 text-2xl" /> Shorts
        </h2>
        <ScrollArea className="w-full whitespace-nowrap pb-6">
          <div className="flex gap-4">
            {shorts.map((short) => (
              <ShortCard key={short.id} video={short} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      {/* Remaining Videos */}
      <section className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {remainingVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </main>
  );
}

