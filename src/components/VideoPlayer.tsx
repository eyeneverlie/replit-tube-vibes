
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ThumbsUp, ThumbsDown, Share, MoreHorizontal } from "lucide-react";
import { Video, formatViewCount } from "@/services/api";

interface VideoPlayerProps {
  video: Video;
  onBackClick: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onBackClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const playHandler = () => setIsPlaying(true);
    const pauseHandler = () => setIsPlaying(false);
    
    videoElement.addEventListener("play", playHandler);
    videoElement.addEventListener("pause", pauseHandler);
    
    return () => {
      videoElement.removeEventListener("play", playHandler);
      videoElement.removeEventListener("pause", pauseHandler);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <Button 
        variant="ghost" 
        onClick={onBackClick}
        className="mb-4"
      >
        <ArrowLeft className="mr-2" size={18} /> Back
      </Button>
      
      <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
        <video 
          ref={videoRef}
          src={video.videoUrl} 
          poster={video.thumbnailUrl}
          controls
          className="w-full h-full"
        />
      </div>
      
      <div className="mt-4">
        <h1 className="text-xl font-bold">{video.title}</h1>
        <div className="flex justify-between items-center mt-2 pb-4 border-b">
          <div className="text-sm text-gray-600">
            {formatViewCount(video.views)}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <ThumbsUp size={18} className="mr-2" /> Like
            </Button>
            <Button variant="ghost" size="sm">
              <ThumbsDown size={18} className="mr-2" /> Dislike
            </Button>
            <Button variant="ghost" size="sm">
              <Share size={18} className="mr-2" /> Share
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={18} />
            </Button>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm whitespace-pre-line">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
