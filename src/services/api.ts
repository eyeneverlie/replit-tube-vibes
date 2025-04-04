
import { toast } from "sonner";

// Base API URL - in a real app, this would point to a separate backend service
const API_BASE_URL = "/api";

// Mock data for videos (will be replaced by real API in production)
const MOCK_VIDEOS = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Learn the basics of React in this tutorial",
    thumbnailUrl: "https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    uploadDate: "2023-04-15",
    views: 1542,
    duration: "10:15",
  },
  {
    id: "2",
    title: "Advanced CSS Techniques",
    description: "Master advanced CSS and create beautiful web designs",
    thumbnailUrl: "https://i.ytimg.com/vi/1Rs2ND1ryYc/maxresdefault.jpg",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    uploadDate: "2023-03-22",
    views: 982,
    duration: "15:42",
  },
  {
    id: "3",
    title: "JavaScript ES6 Features",
    description: "Discover the power of modern JavaScript features",
    thumbnailUrl: "https://i.ytimg.com/vi/NCwa_xi0Uuc/maxresdefault.jpg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    uploadDate: "2023-05-01",
    views: 2103,
    duration: "12:30",
  },
  {
    id: "4",
    title: "Building a Full Stack Application",
    description: "Create a complete web application from scratch",
    thumbnailUrl: "https://i.ytimg.com/vi/5PdEmeopJVQ/maxresdefault.jpg",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    uploadDate: "2023-04-08",
    views: 1287,
    duration: "25:18",
  },
  {
    id: "5",
    title: "Responsive Web Design Fundamentals",
    description: "Learn how to make your websites work on any device",
    thumbnailUrl: "https://i.ytimg.com/vi/srvUrASNj0s/maxresdefault.jpg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    uploadDate: "2023-03-15",
    views: 1876,
    duration: "18:45",
  },
  {
    id: "6",
    title: "Node.js Crash Course",
    description: "Get started with server-side JavaScript using Node.js",
    thumbnailUrl: "https://i.ytimg.com/vi/fBNz5xF-Kx4/maxresdefault.jpg",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    uploadDate: "2023-05-10",
    views: 932,
    duration: "22:10",
  },
];

// Type definitions
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  uploadDate: string;
  views: number;
  duration: string;
}

export interface UploadVideoData {
  title: string;
  description: string;
  videoFile: File;
  thumbnailFile?: File;
}

// API functions
export async function getVideos(): Promise<Video[]> {
  // In a real app, this would be an actual API call
  // return fetch(`${API_BASE_URL}/videos`).then(res => res.json());

  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_VIDEOS), 500);
  });
}

export async function getVideoById(id: string): Promise<Video | null> {
  // In a real app, this would be an actual API call
  // return fetch(`${API_BASE_URL}/videos/${id}`).then(res => res.json());

  // For now, return mock data
  return new Promise((resolve) => {
    const video = MOCK_VIDEOS.find((v) => v.id === id) || null;
    setTimeout(() => resolve(video), 300);
  });
}

export async function uploadVideo(data: UploadVideoData): Promise<Video> {
  // In a real app, this would upload to a server
  // const formData = new FormData();
  // formData.append('title', data.title);
  // formData.append('description', data.description);
  // formData.append('video', data.videoFile);
  // if (data.thumbnailFile) formData.append('thumbnail', data.thumbnailFile);
  // return fetch(`${API_BASE_URL}/videos`, {
  //   method: 'POST',
  //   body: formData
  // }).then(res => res.json());

  // For now, simulate an upload with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a new mock video
      const newVideo: Video = {
        id: Math.random().toString(36).substring(2, 15),
        title: data.title,
        description: data.description,
        thumbnailUrl: data.thumbnailFile 
          ? URL.createObjectURL(data.thumbnailFile)
          : "https://i.ytimg.com/vi/default/maxresdefault.jpg",
        videoUrl: URL.createObjectURL(data.videoFile),
        uploadDate: new Date().toISOString().split('T')[0],
        views: 0,
        duration: "00:00", // In a real app, this would be calculated
      };
      
      toast.success("Video uploaded successfully!");
      resolve(newVideo);
    }, 1500);
  });
}

// Helper functions
export function formatViewCount(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  } else {
    return `${views} views`;
  }
}

export function formatUploadDate(dateString: string): string {
  const uploadDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - uploadDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return "1 day ago";
  } else if (diffDays < 30) {
    return `${diffDays} days ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}
