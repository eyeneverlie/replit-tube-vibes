
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Video, getVideos } from "@/services/api";
import UploadModal from "@/components/UploadModal";
import EditVideoModal from "@/components/EditVideoModal";

// Import our tab components
import VideosTab from "@/components/admin/VideosTab";
import AppearanceTab from "@/components/admin/AppearanceTab";
import TrackingTab from "@/components/admin/TrackingTab";
import CustomCodeTab from "@/components/admin/CustomCodeTab";
import AdminAuth from "@/components/admin/AdminAuth";

const Admin = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [logoUrl, setLogoUrl] = useState<string>(
    localStorage.getItem("customLogo") || ""
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [siteName, setSiteName] = useState<string>(
    localStorage.getItem("siteName") || "TubeVibes"
  );
  const [customHeadCode, setCustomHeadCode] = useState<string>(
    localStorage.getItem("customHeadCode") || ""
  );
  const [gtmId, setGtmId] = useState<string>(
    localStorage.getItem("gtmId") || ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast: uiToast } = useToast();

  useEffect(() => {
    // Check if user is already authenticated
    const adminAuth = localStorage.getItem("adminAuthenticated") || 
                      sessionStorage.getItem("adminAuthenticated");
    
    if (adminAuth === "true") {
      setIsAuthenticated(true);
      loadVideos();
    }
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const fetchedVideos = await getVideos();
      setVideos(fetchedVideos);
    } catch (error) {
      uiToast({
        title: "Error",
        description: "Failed to load videos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUploaded = (newVideo: Video) => {
    setVideos((prevVideos) => [newVideo, ...prevVideos]);
  };

  const handleVideoEdited = (updatedVideo: Video) => {
    setVideos((prevVideos) =>
      prevVideos.map((v) => (v.id === updatedVideo.id ? updatedVideo : v))
    );
    setSelectedVideo(null);
  };

  const handleDeleteVideo = async (videoId: string) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        // In a real app, this would call an API endpoint
        // await deleteVideo(videoId);
        
        // For now, just remove from local state
        setVideos((prevVideos) => prevVideos.filter((v) => v.id !== videoId));
        toast.success("Video deleted successfully");
      } catch (error) {
        toast.error("Failed to delete video");
      }
    }
  };

  const handleEditClick = (video: Video) => {
    setSelectedVideo(video);
    setIsEditModalOpen(true);
  };

  const saveSiteName = () => {
    localStorage.setItem("siteName", siteName);
    toast.success("Website name saved successfully");
  };

  const saveGTM = () => {
    localStorage.setItem("gtmId", gtmId);
    
    // In a real app, this would apply the GTM code immediately
    if (gtmId) {
      toast.success("Google Tag Manager ID saved");
    } else {
      toast.info("Google Tag Manager ID removed");
    }
  };

  const saveCustomCode = () => {
    localStorage.setItem("customHeadCode", customHeadCode);
    toast.success("Custom code saved");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    sessionStorage.removeItem("adminAuthenticated");
    setIsAuthenticated(false);
    toast.info("Logged out successfully");
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-youtube-lightGray">
      <Header onUploadClick={() => setIsUploadModalOpen(true)} />

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex space-x-3">
            <Button 
              onClick={() => setIsUploadModalOpen(true)} 
              className="upload-btn"
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Video
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="videos">
          <TabsList className="mb-4">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="custom">Custom Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos">
            <VideosTab 
              videos={videos} 
              loading={loading}
              onEditClick={handleEditClick}
              onDeleteVideo={handleDeleteVideo}
            />
          </TabsContent>
          
          <TabsContent value="appearance">
            <AppearanceTab
              siteName={siteName}
              setSiteName={setSiteName}
              logoUrl={logoUrl}
              setLogoUrl={setLogoUrl}
              setLogoFile={setLogoFile}
              saveSiteName={saveSiteName}
            />
          </TabsContent>
          
          <TabsContent value="tracking">
            <TrackingTab
              gtmId={gtmId}
              setGtmId={setGtmId}
              saveGTM={saveGTM}
            />
          </TabsContent>
          
          <TabsContent value="custom">
            <CustomCodeTab
              customHeadCode={customHeadCode}
              setCustomHeadCode={setCustomHeadCode}
              saveCustomCode={saveCustomCode}
            />
          </TabsContent>
        </Tabs>
      </main>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onVideoUploaded={handleVideoUploaded}
      />
      
      {selectedVideo && (
        <EditVideoModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          video={selectedVideo}
          onVideoEdited={handleVideoEdited}
        />
      )}
    </div>
  );
};

export default Admin;
