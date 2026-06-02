// src/pages/ProgramEdit.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  useGetProgramByIdQuery,
  useUpdateProgramMutation,
} from "../store/ProgrammsApi";
import { ArrowLeft, ImageIcon, X, Loader2 } from "lucide-react";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading: isLoadingProgram } =
    useGetProgramByIdQuery(id);
  const program = response?.data;
  const [updateProgram, { isLoading: isUpdating }] = useUpdateProgramMutation();

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
  const [existingImageUrl, setExistingImageUrl] = useState("");

  useEffect(() => {
    if (program) {
      setFormData({
        title: program.title || "",
        date: program.date?.split("T")[0] || "",
        time: program.time || "",
        location: program.location || "",
        mode: program.mode || "in-person",
        description: program.description || "",
        spiritualFocus: program.spiritualFocus || "",
        registrationLink: program.registrationLink || "",
        watchLink: program.watchLink || "",
        isPast: program.isPast || false,
      });
      const imgUrl = program.media?.[0]?.url || "";
      setExistingImageUrl(imgUrl);
      setImagePreview(imgUrl);
    }
  }, [program]);

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
    setExistingImageUrl("");
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

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });

    // Handle image: if new file selected, send it; else send existing URL
    if (imageFile) {
      payload.append("media", imageFile); // new file
    } else if (existingImageUrl) {
      payload.append("existingImage", existingImageUrl); // keep existing
    }

    try {
      await updateProgram({ id, formData: payload }).unwrap();
      toast.success("Event updated successfully!");
      navigate("/programs");
    } catch (err) {
      toast.error(err.data?.message || "Failed to update event");
    }
  };

  if (isLoadingProgram) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-12 h-12 text-indigo-600" />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Program not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/programs")}
          className="flex items-center gap-2 text-indigo-600 mb-6 hover:underline"
        >
          <ArrowLeft size={18} /> Back to Programs
        </button>
        <motion.div className="bg-white/60 dark:bg-slate-800/60 rounded-2xl p-8 border shadow-xl">
          <h1 className="text-3xl font-black mb-2">Edit Event</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label>Title *</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl border"
                />
              </div>
              <div>
                <label>Time *</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl border"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label>Location *</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl border"
                />
              </div>
              <div>
                <label>Mode</label>
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border"
                >
                  <option value="in-person">In‑person</option>
                  <option value="online">Online</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>
            <div>
              <label>Description *</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border"
              />
            </div>
            <div>
              <label>Spiritual Focus</label>
              <input
                name="spiritualFocus"
                value={formData.spiritualFocus}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label>Registration Link</label>
                <input
                  name="registrationLink"
                  value={formData.registrationLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border"
                />
              </div>
              <div>
                <label>Watch Link</label>
                <input
                  name="watchLink"
                  value={formData.watchLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border"
                />
              </div>
            </div>
            <div>
              <label>Event Image</label>
              <div className="border-2 border-dashed rounded-2xl p-4 text-center">
                {!imagePreview ? (
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <ImageIcon size={32} className="text-gray-400" />
                    <span>Click to upload new image</span>
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
                      className="max-h-64 rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-3 -right-3 bg-red-500 rounded-full p-1 text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isPast"
                checked={formData.isPast}
                onChange={handleChange}
              />
              <label>Past event (shows in Past Events tab)</label>
            </div>
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold"
            >
              {isUpdating ? "Updating..." : "Update Event"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditEvent;
