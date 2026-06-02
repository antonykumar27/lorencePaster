// models/userModel.js (ഉദാഹരണത്തിന്)
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    isAdmin: { type: Boolean, default: false }, // 👈 ഇതാണ് നമ്മുടെ മാജിക് ഫീൽഡ്!
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
    { id: this._id, role: this.role, isPremium: this.isPremium },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};
module.exports = mongoose.model("User", userSchema);
