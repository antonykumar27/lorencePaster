// src/hooks/useYouTubeVideos.js
import { useState, useEffect } from "react";

const STORAGE_KEY = "divine_youtube_videos";

// Default videos
const defaultVideos = [
  {
    id: "dQw4w9WgXcQ",
    title: "ശക്തമായ പ്രാർത്ഥന സമ്മേളനം",
    date: "2 days ago",
    views: "1.2k views",
  },
  {
    id: "abc123xyz",
    title: "കുടുംബ അനുഗ്രഹ യോഗം",
    date: "1 week ago",
    views: "3.4k views",
  },
  {
    id: "pqr789uvw",
    title: "സ്തുതി ആരാധന – Live Session",
    date: "3 weeks ago",
    views: "852 views",
  },
];

export const useYouTubeVideos = () => {
  const [videos, setVideos] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setVideos(JSON.parse(stored));
    } else {
      setVideos(defaultVideos);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultVideos));
    }
  }, []);

  // Add new video
  const addVideo = (newVideo) => {
    const updated = [newVideo, ...videos]; // new video on top
    setVideos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Remove video (optional)
  const removeVideo = (videoId) => {
    const updated = videos.filter((v) => v.id !== videoId);
    setVideos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { videos, addVideo, removeVideo };
};
