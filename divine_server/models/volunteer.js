const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  skills: { type: String }, // അവരുടെ തൊഴിൽ അല്ലെങ്കിൽ കഴിവുകൾ
  interestedArea: {
    type: String,
    enum: ["food", "education", "medical", "community"],
    required: true,
  },
  message: { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
