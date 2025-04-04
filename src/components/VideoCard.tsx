
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Video, formatViewCount, formatUploadDate } from "@/services/api";

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <Card 
      className="video-card cursor-pointer hover:shadow-md transition-all duration-200" 
      onClick={onClick}
    >
      <div className="w-full aspect-video overflow-hidden relative">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="video-thumbnail w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
          {video.duration}
        </div>
      </div>
      <CardContent className="p-3">
        <h3 className="video-title font-medium text-base line-clamp-2">{video.title}</h3>
        <p className="video-info mt-1 text-sm text-gray-500">
          {formatViewCount(video.views)} • {formatUploadDate(video.uploadDate)}
        </p>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
