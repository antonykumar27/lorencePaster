// models/PrayerRequest.js
const mongoose = require("mongoose");

const prayerRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    subject: {
      type: String,
      enum: ["General", "Health", "Family", "Financial", "Education"],
      default: "General",
    },
    message: {
      type: String,
      required: [true, "Prayer request message is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "prayed", "completed"],
      default: "pending",
    },
    // Optional: store IP address or user agent for security
    ipAddress: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  },
);

// Optional: index for faster searching
prayerRequestSchema.index({ name: "text", message: "text", email: "text" });

module.exports = mongoose.model("PrayerRequest", prayerRequestSchema);
