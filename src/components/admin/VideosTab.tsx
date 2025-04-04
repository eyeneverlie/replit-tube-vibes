
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { Video, formatViewCount } from "@/services/api";

interface VideosTabProps {
  videos: Video[];
  loading: boolean;
  onEditClick: (video: Video) => void;
  onDeleteVideo: (videoId: string) => void;
}

const VideosTab: React.FC<VideosTabProps> = ({ 
  videos, 
  loading, 
  onEditClick,
  onDeleteVideo 
}) => {
  return (
    <div className="bg-white p-4 rounded-md">
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
                        onClick={() => onEditClick(video)}
                      >
                        <Edit2 className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => onDeleteVideo(video.id)}
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
    </div>
  );
};

export default VideosTab;
