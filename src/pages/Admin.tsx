
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Edit2,
  Trash2,
  Upload,
  Image as ImageIcon,
  Code,
  Tag,
} from "lucide-react";
import { Video, getVideos, uploadVideo, formatViewCount } from "@/services/api";
import UploadModal from "@/components/UploadModal";
import EditVideoModal from "@/components/EditVideoModal";

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
  const [customHeadCode, setCustomHeadCode] = useState<string>(
    localStorage.getItem("customHeadCode") || ""
  );
  const [gtmId, setGtmId] = useState<string>(
    localStorage.getItem("gtmId") || ""
  );
  const { toast: uiToast } = useToast();

  useEffect(() => {
    loadVideos();
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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      const objectUrl = URL.createObjectURL(file);
      setLogoUrl(objectUrl);
      localStorage.setItem("customLogo", objectUrl);
      toast.success("Logo updated successfully");
    }
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

  return (
    <div className="min-h-screen flex flex-col bg-youtube-lightGray">
      <Header onUploadClick={() => setIsUploadModalOpen(true)} />

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <Button 
            onClick={() => setIsUploadModalOpen(true)} 
            className="upload-btn"
          >
            <Upload className="mr-2 h-4 w-4" /> Upload Video
          </Button>
        </div>

        <Tabs defaultValue="videos">
          <TabsList className="mb-4">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="custom">Custom Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos" className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-medium mb-4">Manage Videos</h2>
            
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Thumbnail</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No videos found. Click "Upload Video" to add your first video.
                      </TableCell>
                    </TableRow>
                  ) : (
                    videos.map((video) => (
                      <TableRow key={video.id}>
                        <TableCell>
                          <img 
                            src={video.thumbnailUrl} 
                            alt={video.title} 
                            className="w-24 aspect-video object-cover rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{video.title}</TableCell>
                        <TableCell>{formatViewCount(video.views)}</TableCell>
                        <TableCell>{video.uploadDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditClick(video)}
                            >
                              <Edit2 className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteVideo(video.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </TabsContent>
          
          <TabsContent value="appearance" className="bg-white p-6 rounded-md">
            <h2 className="text-lg font-medium mb-4">Customize Appearance</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="logo" className="block mb-2">Site Logo</Label>
                <div className="flex flex-col space-y-4">
                  {logoUrl && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Current Logo:</p>
                      <img 
                        src={logoUrl} 
                        alt="Custom Logo" 
                        className="h-12 object-contain bg-gray-100 rounded p-2" 
                      />
                    </div>
                  )}
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('logo-upload')?.click()}
                    >
                      <ImageIcon className="h-4 w-4 mr-2" /> Choose Logo
                    </Button>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                    {logoUrl && (
                      <Button 
                        variant="destructive" 
                        onClick={() => {
                          setLogoUrl("");
                          localStorage.removeItem("customLogo");
                          toast.info("Logo removed");
                        }}
                      >
                        Remove Logo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tracking" className="bg-white p-6 rounded-md">
            <h2 className="text-lg font-medium mb-4">Tracking & Analytics</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="gtm" className="block mb-2">Google Tag Manager ID</Label>
                <div className="flex items-end space-x-4">
                  <div className="flex-grow">
                    <Input
                      id="gtm"
                      placeholder="GTM-XXXXXX"
                      value={gtmId}
                      onChange={(e) => setGtmId(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter your GTM container ID (e.g., GTM-XXXXXX)
                    </p>
                  </div>
                  <Button onClick={saveGTM}>Save</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="bg-white p-6 rounded-md">
            <h2 className="text-lg font-medium mb-4">Custom Code</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="custom-code" className="block mb-2">Custom Head Code</Label>
                <Textarea
                  id="custom-code"
                  placeholder="<!-- Add your custom HTML, CSS, or JavaScript here -->"
                  className="font-mono text-sm h-48"
                  value={customHeadCode}
                  onChange={(e) => setCustomHeadCode(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Add custom code that will be injected into the &lt;head&gt; section of your site.
                </p>
              </div>
              <Button onClick={saveCustomCode}>
                <Code className="h-4 w-4 mr-2" /> Save Custom Code
              </Button>
            </div>
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
