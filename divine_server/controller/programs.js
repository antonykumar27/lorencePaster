// controllers/programController.js
const catchAsyncError = require("../middlwares/catchAsyncError");
const ErrorHandler = require("../middlwares/errorHandler");
const Program = require("../models/program");
const { uploadFileToCloudinary } = require("../config/cloudinary");
const fs = require("fs").promises;

// ➕ CREATE PROGRAM (with image upload)
const createProgram = catchAsyncError(async (req, res, next) => {
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  const {
    title,
    date,
    time,
    location,
    mode,
    description,
    spiritualFocus,
    registrationLink,
    watchLink,
    isPast,
  } = req.body;

  // 1. Validate required fields
  if (!title || !date || !time || !location || !description) {
    return next(
      new ErrorHandler(
        "Title, date, time, location and description are required",
        400,
      ),
    );
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

  // 3. Create program in database
  const program = await Program.create({
    title,
    date,
    time,
    location,
    mode,
    description,
    spiritualFocus: spiritualFocus || "",
    registrationLink: registrationLink || "",
    watchLink: watchLink || "",
    isPast: isPast === "true" || isPast === true,
    media,
  });

  // 4. Send success response
  res.status(201).json({
    success: true,
    message: "Program created successfully",
    data: program,
  });
});
// controllers/programController.js (add after createProgram)

// 📋 GET ALL PROGRAMS (sorted by date, newest first)
const getAllPrograms = catchAsyncError(async (req, res, next) => {
  const { isPast } = req.query; // optional filter: ?isPast=true or false

  let query = {};
  if (isPast !== undefined) {
    query.isPast = isPast === "true";
  }

  const programs = await Program.find(query).sort({ date: -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: programs.length,
    data: programs,
  });
});

// 🔍 GET SINGLE PROGRAM BY ID
const getProgramById = catchAsyncError(async (req, res, next) => {
  const program = await Program.findById(req.params.id);
  if (!program) {
    return next(new ErrorHandler("Program not found", 404));
  }
  res.status(200).json({
    success: true,
    data: program,
  });
});
const updateProgram = catchAsyncError(async (req, res, next) => {
  const program = await Program.findById(req.params.id);
  if (!program) return next(new ErrorHandler("Program not found", 404));

  const {
    title,
    date,
    time,
    location,
    mode,
    description,
    spiritualFocus,
    registrationLink,
    watchLink,
    isPast,
    existingImage,
  } = req.body;

  // ✅ CORRECT: req.files is { media: [file] }
  const mediaFiles = req.files?.media || [];
  let media = program.media; // keep existing by default

  if (mediaFiles.length > 0) {
    // New image uploaded – replace old one
    const uploaded = await uploadFileToCloudinary(mediaFiles[0]);
    media = [
      {
        url: uploaded.url,
        type: uploaded.type,
        pdfUrl: uploaded.pdfUrl || null,
      },
    ];
    // Clean up temp file
    await fs.unlink(mediaFiles[0].path).catch(() => {});
  }
  // else if existingImage is present, we keep the original media (already set)
  // else optionally clear media: media = [];

  const updateData = {
    title: title || program.title,
    date: date || program.date,
    time: time || program.time,
    location: location || program.location,
    mode: mode || program.mode,
    description: description || program.description,
    spiritualFocus: spiritualFocus || program.spiritualFocus,
    registrationLink: registrationLink || program.registrationLink,
    watchLink: watchLink || program.watchLink,
    isPast: isPast === "true" || isPast === true || program.isPast,
    media,
  };

  const updatedProgram = await Program.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true },
  );

  res.status(200).json({ success: true, data: updatedProgram });
});
const interestProgram = catchAsyncError(async (req, res, next) => {
  const program = await Program.findById(req.params.id);
  if (!program) return next(new ErrorHandler("Program not found", 404));

  const userId = req.user._id;
  const already = program.interestedUsers.includes(userId);

  if (already) {
    // Remove interest
    program.interestedUsers = program.interestedUsers.filter(
      (id) => id.toString() !== userId.toString(),
    );
    program.interestCount = Math.max(0, program.interestCount - 1);
  } else {
    // Add interest
    program.interestedUsers.push(userId);
    program.interestCount += 1;
  }

  await program.save();
  res.status(200).json({
    success: true,
    interested: !already,
    interestCount: program.interestCount,
  });
});
const joinProgram = catchAsyncError(async (req, res, next) => {
  const program = await Program.findById(req.params.id);
  if (!program) return next(new ErrorHandler("Program not found", 404));

  const userId = req.user._id;
  const already = program.joinedUsers.includes(userId);

  if (already) {
    // Remove join
    program.joinedUsers = program.joinedUsers.filter(
      (id) => id.toString() !== userId.toString(),
    );
    program.joinCount = Math.max(0, program.joinCount - 1);
  } else {
    // Add join
    program.joinedUsers.push(userId);
    program.joinCount += 1;
  }

  await program.save();
  res.status(200).json({
    success: true,
    joined: !already,
    joinCount: program.joinCount,
  });
});
const getProgramAttendees = catchAsyncError(async (req, res, next) => {
  const program = await Program.findById(req.params.id)
    .populate("joinedUsers", "name email mobileNumber") // join ചെയ്തവരുടെ വിശദാംശങ്ങൾ
    .populate("interestedUsers", "name email mobileNumber"); // like ചെയ്തവർക്ക് name + email മാത്രം (ഫോൺ വേണ്ട)

  if (!program) {
    return next(new ErrorHandler("Program not found", 404));
  }

  res.status(200).json({
    success: true,
    joinedUsers: program.joinedUsers, // full details
    interestedUsers: program.interestedUsers, // name, email only
    joinCount: program.joinCount,
    interestCount: program.interestCount,
  });
});
module.exports = {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  interestProgram,
  joinProgram,
  getProgramAttendees,
};
