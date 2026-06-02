// src/pages/CreateGallery.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useCreateGalleryImageMutation } from "../store/GalleryApi";
import { ArrowLeft, ImageIcon, X, Loader2 } from "lucide-react";

const CreateGallery = () => {
  const navigate = useNavigate();
  const [createImage, { isLoading }] = useCreateGalleryImageMutation();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "events",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.date ||
      !formData.description ||
      !imageFile
    ) {
      toast.error("Please fill all required fields and select an image");
      return;
    }

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("date", formData.date);
    payload.append("category", formData.category);
    payload.append("description", formData.description);
    payload.append("media", imageFile);

    try {
      await createImage(payload).unwrap();
      toast.success("Gallery image added successfully!");
      navigate("/gallery");
    } catch (err) {
      toast.error(err.data?.message || "Failed to upload image");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/gallery")}
          className="flex items-center gap-2 text-indigo-600 mb-6 hover:underline"
        >
          <ArrowLeft size={18} /> Back to Gallery
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border shadow-xl"
        >
          <h1 className="text-3xl font-black mb-2">Add New Gallery Image</h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Upload a photo from worship services, events, or ministries.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-slate-900"
                placeholder="e.g., Sunday Worship Service"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-slate-900"
              >
                <option value="events">Events</option>
                <option value="prayer">Prayer Meetings</option>
                <option value="ministries">Ministries</option>
                <option value="trending2026">Trending 2026</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Description *
              </label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-slate-900"
                placeholder="Describe the moment..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Image * (max 5MB)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl p-6 text-center transition-colors">
                {!imagePreview ? (
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <ImageIcon size={40} className="text-gray-400" />
                    <span className="text-sm text-slate-500">
                      Click to upload image
                    </span>
                    <span className="text-xs text-slate-400">
                      JPG, PNG, GIF (max 5MB)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required
                    />
                  </label>
                ) : (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 w-auto mx-auto rounded-lg border shadow-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-3 -right-3 bg-red-500 rounded-full p-1.5 text-white hover:bg-red-600 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin inline mr-2" size={18} />
              ) : null}
              {isLoading ? "Uploading..." : "Add to Gallery"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateGallery;
