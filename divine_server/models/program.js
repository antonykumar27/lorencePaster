// models/Program.js
const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    mode: {
      type: String,
      enum: ["in-person", "online", "hybrid"],
      default: "in-person",
    },
    description: { type: String, required: true },
    spiritualFocus: { type: String, default: "" },
    registrationLink: { type: String, default: "" },
    watchLink: { type: String, default: "" },
    isPast: { type: Boolean, default: false },
    interestCount: { type: Number, default: 0 },
    interestedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    joinCount: { type: Number, default: 0 },
    joinedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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

module.exports = mongoose.model("Program", programSchema);
