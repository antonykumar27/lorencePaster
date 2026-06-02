const mongoose = require("mongoose");
const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    category: {
      type: String,
      enum: ["events", "prayer", "ministries", "trending2026"],
      required: true,
    },
    description: { type: String, required: true },
    media: [
      {
        url: String,
        type: {
          type: String,
          enum: ["image", "video", "pdf"],
        },
        pdfUrl: String,
      },
    ],
  },
  { timestamps: true },
);
module.exports = mongoose.model("Gallery", gallerySchema);
