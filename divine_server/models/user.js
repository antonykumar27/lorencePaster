const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: Number, required: true },

    // 👈 റോളുകൾ കൃത്യമായി ഇവിടെ മാനേജ് ചെയ്യാം
    role: {
      type: String,
      enum: ["common_user", "church_member", "admin"],
      default: "common_user", // പുതിയൊരാൾ രജിസ്റ്റർ ചെയ്യുമ്പോൾ ഡിഫോൾട്ടായി കോമൺ യൂസർ ആയിരിക്കും
    },
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

// ========== MIDDLEWARE ==========
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ========== INSTANCE METHODS ==========
userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role }, // 👈 role ഇപ്പൊ ടോക്കണിൽ കറക്റ്റ് ആയി കയറും
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

module.exports = mongoose.model("User", userSchema);
