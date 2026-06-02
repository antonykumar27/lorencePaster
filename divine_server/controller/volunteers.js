const Volunteer = require("../models/volunteer");
const catchAsyncError = require("../middlwares/catchAsyncError"); // adjust path as needed

const createVolunteer = catchAsyncError(async (req, res) => {
  const { name, email, phone, skills, interestedArea, message } = req.body;

  // Validation – all required fields must be present
  if (!name || !email || !phone || !interestedArea) {
    return res.status(400).json({
      success: false,
      message: "Name, email, phone, and interested area are required",
    });
  }

  // Optional: email format validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  // Check if volunteer with same email already exists (optional but recommended)
  const existingVolunteer = await Volunteer.findOne({ email });
  if (existingVolunteer) {
    return res.status(409).json({
      success: false,
      message: "A volunteer with this email already exists",
    });
  }

  // Create volunteer document
  const volunteer = await Volunteer.create({
    name,
    email,
    phone,
    skills: skills || "", // default empty string if not provided
    interestedArea,
    message: message || "",
    status: "pending", // default from schema, but explicit is fine
  });

  res.status(201).json({
    success: true,
    data: volunteer,
  });
});

// GET /api/admin/volunteers?status=pending&page=1&limit=10
const getVolunteers = catchAsyncError(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;
  const filter = {};

  if (status && ["pending", "approved", "rejected"].includes(status)) {
    filter.status = status;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const volunteers = await Volunteer.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Volunteer.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: volunteers,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit)),
    },
  });
});

// PUT /api/admin/volunteers/:id/status
const updateVolunteerStatus = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value",
    });
  }

  const volunteer = await Volunteer.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );

  if (!volunteer) {
    return res.status(404).json({
      success: false,
      message: "Volunteer not found",
    });
  }

  res.status(200).json({
    success: true,
    data: volunteer,
  });
});

// DELETE /api/admin/volunteers/:id (optional)
const deleteVolunteer = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const volunteer = await Volunteer.findByIdAndDelete(id);
  if (!volunteer) {
    return res.status(404).json({
      success: false,
      message: "Volunteer not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Volunteer deleted successfully",
  });
});
// controllers/helpController.js
const HelpRequest = require("../models/helpRequest");

const createHelpRequest = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const newRequest = await HelpRequest.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Help request submitted successfully",
      data: newRequest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to submit request",
    });
  }
};

// ========== GET ALL (with pagination, filter by status) ==========
const getAllHelpRequests = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (
      status &&
      ["pending", "in-progress", "resolved", "closed"].includes(status)
    ) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const requests = await HelpRequest.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await HelpRequest.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: requests,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch help requests",
    });
  }
};

// ========== GET SINGLE REQUEST ==========
const getHelpRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await HelpRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Help request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch request",
    });
  }
};

// ========== UPDATE (status, assignedTo, resolution) ==========
const updateHelpRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo, resolution } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    if (resolution !== undefined) updateData.resolution = resolution;

    const updatedRequest = await HelpRequest.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Help request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Help request updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update request",
    });
  }
};

// ========== DELETE ==========
const deleteHelpRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await HelpRequest.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Help request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Help request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete request",
    });
  }
};
module.exports = {
  createVolunteer,
  getVolunteers,
  updateVolunteerStatus,
  deleteVolunteer,
  createHelpRequest,
  createHelpRequest,
  getAllHelpRequests,
  getHelpRequestById,
  updateHelpRequest,
  deleteHelpRequest,
};
