
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Save, Image, X } from "lucide-react";
import { Video } from "@/services/api";
import { toast } from "sonner";

interface EditVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video;
  onVideoEdited: (video: Video) => void;
}

const EditVideoModal: React.FC<EditVideoModalProps> = ({
  isOpen,
  onClose,
  video,
  onVideoEdited,
}) => {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(video.thumbnailUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API endpoint
      // const updatedVideo = await updateVideo(video.id, {
      //   title,
      //   description,
      //   thumbnailFile
      // });
      
      // For now, just update the local state
      const updatedVideo: Video = {
        ...video,
        title,
        description,
        thumbnailUrl: thumbnailPreview || video.thumbnailUrl
      };
      
      toast.success("Video updated successfully!");
      onVideoEdited(updatedVideo);
      handleClose();
    } catch (error) {
      toast.error("Failed to update video. Please try again.");
      console.error("Update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(video.thumbnailUrl);
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Video</DialogTitle>
          <DialogDescription>
            Update your video details
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              className="h-24"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <div className="relative">
              <img
                src={thumbnailPreview || ""}
                alt="Thumbnail preview"
                className="w-full h-[150px] rounded-md object-cover mb-2"
              />
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => thumbnailInputRef.current?.click()}
                >
                  <Image className="mr-2 h-4 w-4" /> Change Thumbnail
                </Button>
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="upload-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVideoModal;
