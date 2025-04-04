
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
      className="video-card cursor-pointer" 
      onClick={onClick}
    >
      <div className="w-full aspect-video overflow-hidden">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="video-thumbnail"
        />
      </div>
      <CardContent className="p-3">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-info mt-1">
          {formatViewCount(video.views)} • {formatUploadDate(video.uploadDate)}
        </p>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
