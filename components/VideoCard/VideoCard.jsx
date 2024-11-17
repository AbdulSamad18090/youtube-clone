import { convertTime, formatNumber, timeAgo } from "@/lib/utils/BasicUtils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function VideoCard({ video }) {
  return (
    <div className="group relative">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={`Thumbnail for ${video.title}`}
          className="aspect-video w-full rounded-xl object-cover"
        />
        <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-xs text-white">
          {convertTime(video.duration)}
        </div>
      </div>
      <div className="mt-3 flex gap-3">
        <Avatar className="h-9 w-9 rounded-full">
          <AvatarImage
            src={video.channelImage}
            alt={`${video.channel} avatar`}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">
            {video.title}
          </h3>
          <div className="text-sm text-gray-600">
            <span>{video.channelTitle}</span>
          </div>
          <div className="text-sm text-gray-600">
            <span>{formatNumber(video.viewCount)} views</span>
            <span> • </span>
            <span>{timeAgo(video.publishedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
