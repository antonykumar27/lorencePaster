// src/pages/EditGallery.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  useGetGalleryImageByIdQuery,
  useUpdateGalleryImageMutation,
} from "../store/GalleryApi";
import { ArrowLeft, ImageIcon, X, Loader2 } from "lucide-react";

const EditGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading: isLoadingImage } =
    useGetGalleryImageByIdQuery(id);
  const galleryImage = response?.data;
  const [updateImage, { isLoading: isUpdating }] =
    useUpdateGalleryImageMutation();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "events",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (galleryImage) {
      setFormData({
        title: galleryImage.title || "",
        date: galleryImage.date || "",
        category: galleryImage.category || "events",
        description: galleryImage.description || "",
      });
      // Use existing image URL from media array (first item)
      const existingImageUrl = galleryImage.media?.[0]?.url || "";
      setImagePreview(existingImageUrl);
    }
  }, [galleryImage]);

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
    if (!formData.title || !formData.date || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("date", formData.date);
    payload.append("category", formData.category);
    payload.append("description", formData.description);

    if (imageFile) {
      payload.append("media", imageFile); // field name "image" (backend expects file)
    } else if (imagePreview && !imageFile) {
      // If image hasn't changed, send the existing URL to keep it
      payload.append("existingImage", imagePreview);
    }

    try {
      await updateImage({ id, formData: payload }).unwrap();
      toast.success("Gallery image updated successfully!");
      navigate("/gallery");
    } catch (err) {
      toast.error(err.data?.message || "Failed to update image");
    }
  };

  if (isLoadingImage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-12 h-12 text-indigo-600" />
      </div>
    );
  }

  if (!galleryImage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Image not found</p>
      </div>
    );
  }

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
          <h1 className="text-3xl font-black mb-2">Edit Gallery Image</h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Update the details or replace the image.
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
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Date *</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                placeholder="May 15, 2026"
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
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Image (max 5MB)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl p-6 text-center transition-colors">
                {!imagePreview ? (
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <ImageIcon size={40} className="text-gray-400" />
                    <span className="text-sm text-slate-500">
                      Click to upload new image
                    </span>
                    <span className="text-xs text-slate-400">
                      JPG, PNG, GIF (max 5MB)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
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
                    <p className="text-xs text-slate-500 mt-2">
                      {imageFile
                        ? "New image selected"
                        : "Current image – upload a new one to replace"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition disabled:opacity-50"
            >
              {isUpdating ? (
                <Loader2 className="animate-spin inline mr-2" size={18} />
              ) : null}
              {isUpdating ? "Updating..." : "Update Image"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditGallery;
