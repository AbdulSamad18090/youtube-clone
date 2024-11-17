import { convertTime, formatNumber, timeAgo } from "@/lib/utils/BasicUtils";

export default function ShortCard({ video }) {
  return (
    <div className="group relative flex-shrink-0 w-[220px]">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={`Thumbnail for ${video.title}`}
          className="w-full h-[400px] rounded-xl object-cover"
        />
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
          {convertTime(video.duration)}
        </div>
      </div>
      <div className="mt-3 text-sm">
        <h3 className="font-semibold line-clamp-1 w-[220px]">{video.title}</h3>
        <div className="mt-1 text-xs text-gray-600 line-clamp-1">
          <span>{video.channelTitle}</span>
        </div>
        <div className="mt-1 text-xs text-gray-600">
          <span>{formatNumber(video.viewCount)} views</span>
          <span> • </span>
          <span>{timeAgo(video.publishedAt)}</span>
        </div>
      </div>
    </div>
  );
}
