
import React, { useState, useEffect } from "react";
import { getVideos, Video } from "@/services/api";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import VideoPlayer from "@/components/VideoPlayer";
import UploadModal from "@/components/UploadModal";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const fetchedVideos = await getVideos();
      setVideos(fetchedVideos);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load videos. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to load videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackClick = () => {
    setSelectedVideo(null);
  };

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleVideoUploaded = (newVideo: Video) => {
    setVideos((prevVideos) => [newVideo, ...prevVideos]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-youtube-lightGray">
      <Header onUploadClick={handleUploadClick} />

      <main className="flex-grow">
        {selectedVideo ? (
          <VideoPlayer video={selectedVideo} onBackClick={handleBackClick} />
        ) : (
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Recommended Videos</h1>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-2 animate-pulse">
                    <div className="bg-gray-200 aspect-video rounded" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={() => handleVideoClick(video)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onVideoUploaded={handleVideoUploaded}
      />
    </div>
  );
};

export default Index;
