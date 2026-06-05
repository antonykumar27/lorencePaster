const catchAsyncError = require("../middlwares/catchAsyncError.js");

const ErrorHandler = require("../middlwares/errorHandler.js");

const sendToken = require("../middlwares/jwt.js");
const bcrypt = require("bcryptjs");

const User = require("../models/user.js");

const fs = require("fs"); // 💡 ഇത് ചേർക്കണം
const { uploadFileToCloudinary } = require("../config/cloudinary.js"); // 💡 ഇതും വേണം

exports.checkAdminEmail = catchAsyncError(async (req, res) => {
  let { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  email = email.toLowerCase(); // ഇമെയിൽ ലോവർകേസ് ആക്കുന്നു
  const adminEmail = "divine@gmail.com";

  // Check if email exists in database
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json({
      success: false,
      message: "Email already registered",
      isAvailable: false,
    });
  }

  // Check if it's admin email
  if (email === adminEmail.toLowerCase()) {
    return res.json({
      success: true,
      message: "this is admin email",
      isAvailable: true,
    });
  }

  // Regular email
  res.json({
    success: true,
    message: "Email is available",
    isAvailable: true,
  });
});

exports.register = catchAsyncError(async (req, res, next) => {
  console.log("req.body", req.body);
  const { name, email, password, adminSecretCode, mobileNumber, role } =
    req.body;
  const ADMIN_EMAIL = "divine@gmail.com";
  const ADMIN_SECRET_CODE = "ADMIN2024!@#";

  // 1. യൂസർ ഓൾറെഡി ഉണ്ടോ എന്ന് പരിശോധിക്കുന്നു
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already exists with this email", 400));
  }

  // 2. അഡ്മിൻ ലോജിക്
  let isAdmin = false;

  if (email === ADMIN_EMAIL) {
    if (!adminSecretCode || adminSecretCode !== ADMIN_SECRET_CODE) {
      return next(new ErrorHandler("Invalid admin secret code", 403));
    }
    isAdmin = true;
  }
  // 2. Handle image upload (if provided)
  const mediaFiles = req.files?.media || [];
  const media = [];

  for (const file of mediaFiles) {
    const uploaded = await uploadFileToCloudinary(file);

    media.push({
      url: uploaded.url,
      type: uploaded.type,
      pdfUrl: uploaded.pdfUrl || null,
    });

    fs.unlink(file.path, () => {});
  }
  // 3. യൂസർ ക്രിയേഷൻ
  const user = await User.create({
    name,
    email,
    password,
    mobileNumber,
    media,
    role,
    isAdmin, // 👈 ഇവിടെയാണ് മാറ്റം
  });

  // 4. JWT അയക്കുന്നു
  sendToken(user, 201, res);
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password, mobileNumber } = req.body;

  // 1. Validate input
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  // 2. Find user + include password
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // 3. Compare password
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // 4. Password ഒഴിവാക്കുന്നു
  user.password = undefined;

  // 5. Send token
  // JWT-ൽ isAdmin ഫീൽഡ് കൂടി ഉൾപ്പെടുത്താൻ sendToken ഫങ്ഷനിൽ ശ്രദ്ധിക്കുക
  sendToken(user, 200, res);
});

// Get all members (excluding admins) with pagination, search, and filtering
exports.getAllMembers = catchAsyncError(async (req, res) => {
  const { page = 1, limit = 10, search = "", role = "" } = req.query;

  // Build filter - exclude admins, only church_member and common_user
  const filter = { role: { $in: ["church_member", "common_user"] } };

  // Add role filter if provided
  if (role && ["church_member", "common_user"].includes(role)) {
    filter.role = role;
  }

  // Add search filter (name or email)
  if (search.trim()) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { mobileNumber: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [members, total] = await Promise.all([
    User.find(filter)
      .select("-password -__v") // exclude sensitive fields
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    User.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: members,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit)),
    },
  });
});
