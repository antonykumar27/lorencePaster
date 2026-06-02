// src/pages/CreateEvent.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateProgramMutation } from "../store/ProgrammsApi";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Users,
  Heart,
  ArrowLeft,
  Image as ImageIcon,
  X,
} from "lucide-react";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [createProgram, { isLoading }] = useCreateProgramMutation();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    mode: "in-person",
    description: "",
    spiritualFocus: "",
    registrationLink: "",
    watchLink: "",
    isPast: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      !formData.time ||
      !formData.location ||
      !formData.description
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // Create FormData for multipart upload
    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("date", formData.date);
    payload.append("time", formData.time);
    payload.append("location", formData.location);
    payload.append("mode", formData.mode);
    payload.append("description", formData.description);
    payload.append("spiritualFocus", formData.spiritualFocus);
    payload.append("registrationLink", formData.registrationLink);
    payload.append("watchLink", formData.watchLink);
    payload.append("isPast", formData.isPast);
    if (imageFile) {
      payload.append("media", imageFile);
    }

    try {
      await createProgram(payload).unwrap();
      toast.success("Event created successfully!");
      navigate("/programs");
    } catch (err) {
      toast.error(err.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/programs")}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-6 hover:underline"
        >
          <ArrowLeft size={18} /> Back to Programs
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl"
        >
          <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2">
            Create New Event
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Add an upcoming or past program/event.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-slate-900"
                required
              />
            </div>

            {/* Date & Time – improved with native inputs */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-slate-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-slate-900"
                  required
                />
              </div>
            </div>

            {/* Location & Mode */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Divine Ministries Main Sanctuary"
                  className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-slate-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Mode</label>
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-slate-900"
                >
                  <option value="in-person">In‑person</option>
                  <option value="online">Online</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Description *
              </label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-slate-900"
                required
              />
            </div>

            {/* Spiritual Focus */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Spiritual Focus
              </label>
              <input
                type="text"
                name="spiritualFocus"
                value={formData.spiritualFocus}
                onChange={handleChange}
                placeholder="Family restoration, blessings..."
                className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-slate-900"
              />
            </div>

            {/* Links */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Registration Link
                </label>
                <input
                  type="url"
                  name="registrationLink"
                  value={formData.registrationLink}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Watch Link (Live/Recording)
                </label>
                <input
                  type="url"
                  name="watchLink"
                  value={formData.watchLink}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-xl border bg-gray-50 dark:bg-slate-900"
                />
              </div>
            </div>

            {/* Image Upload – improved UI with dashed border and larger preview */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Event Image (max 5MB)
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
                    />
                  </label>
                ) : (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Event preview"
                      className="max-h-64 w-auto mx-auto rounded-lg border shadow-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-3 -right-3 bg-red-500 rounded-full p-1.5 text-white hover:bg-red-600 transition-colors shadow-md"
                      aria-label="Remove image"
                    >
                      <X size={16} />
                    </button>
                    <p className="text-xs text-slate-500 mt-2">
                      Click{" "}
                      <span className="text-indigo-500">choose new image</span>{" "}
                      above to replace
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Past Event Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isPast"
                checked={formData.isPast}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300"
              />
              <label className="text-sm">
                This is a past event (will show in Past Events tab)
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition disabled:opacity-50 shadow-md"
              >
                {isLoading ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateEvent;
