// src/pages/CreateYoutube.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useYouTubeVideos } from "./useYouTubeVideos";
import { ArrowLeft, Video, Plus } from "lucide-react";

const CreateYoutube = () => {
  const navigate = useNavigate();
  const { addVideo } = useYouTubeVideos();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    date: "",
    views: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.title) {
      setError("Video ID and Title are required.");
      return;
    }
    // Validate YouTube video ID format (basic)
    if (formData.id.length < 5 || formData.id.includes(" ")) {
      setError("Invalid YouTube Video ID.");
      return;
    }
    const newVideo = {
      id: formData.id.trim(),
      title: formData.title.trim(),
      date: formData.date || "Just now",
      views: formData.views || "0 views",
    };
    addVideo(newVideo);
    navigate("/"); // redirect to home after adding
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-amber-50 dark:from-slate-900 dark:to-slate-800 py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-amber-600 hover:text-amber-700 transition"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-red-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Video size={28} /> Add New YouTube Video
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                YouTube Video ID *
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="e.g., dQw4w9WgXcQ"
                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                Video link: https://youtu.be/<strong>VIDEO_ID</strong>
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Video title in Malayalam / English"
                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Date / Time
                </label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="e.g., 2 days ago"
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Views
                </label>
                <input
                  type="text"
                  name="views"
                  value={formData.views}
                  onChange={handleChange}
                  placeholder="e.g., 1.2k views"
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Plus size={20} /> Add Video & Go Home
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateYoutube;
