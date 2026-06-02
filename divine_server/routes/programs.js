const express = require("express");
// 💡 കൺട്രോളർ ഫയൽ പേര് കൃത്യമായിരിക്കണം.
// ബ്രോയുടെ കോഡ് പ്രകാരം ഇത് ഒരു ഫയലിലാണെങ്കിൽ, താഴെ പറയുന്ന പോലെ മാറ്റുക:
const {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  interestProgram,
  joinProgram,
  getProgramAttendees,
} = require("../controller/programs");
const { multerMiddleware } = require("../config/cloudinary");
const { isAuthenticatedUser } = require("../middlwares/authenticate");
const router = express.Router();

// റൂട്ടുകൾ

router.post("/", multerMiddleware, createProgram);
router.get("/", getAllPrograms);
router.get("/:id", getProgramById);
router.put("/:id", multerMiddleware, updateProgram);
router.post("/:id/interest", isAuthenticatedUser, interestProgram);
router.post("/:id/join", isAuthenticatedUser, joinProgram);
router.get("/:id/attendees", isAuthenticatedUser, getProgramAttendees);

module.exports = router;
