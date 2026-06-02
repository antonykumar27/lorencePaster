const express = require("express");
// 💡 കൺട്രോളർ ഫയൽ പേര് കൃത്യമായിരിക്കണം.
// ബ്രോയുടെ കോഡ് പ്രകാരം ഇത് ഒരു ഫയലിലാണെങ്കിൽ, താഴെ പറയുന്ന പോലെ മാറ്റുക:
const {
  createVolunteer,
  getVolunteers,
  updateVolunteerStatus,
  deleteVolunteer,
  createHelpRequest,
  getAllHelpRequests,
  getHelpRequestById,
  updateHelpRequest,
  deleteHelpRequest,
} = require("../controller/volunteers");
const { multerMiddleware } = require("../config/cloudinary");
const { isAuthenticatedUser } = require("../middlwares/authenticate");
const router = express.Router();

// റൂട്ടുകൾ

router.post("/", multerMiddleware, createVolunteer);
router.get("/", isAuthenticatedUser, getVolunteers);
router.put("/:id/status", isAuthenticatedUser, updateVolunteerStatus);
router.delete("/:id", isAuthenticatedUser, deleteVolunteer);
router.post("/helps", multerMiddleware, createHelpRequest);
router.get("/helps", getAllHelpRequests);
router.get("/helps/:id", isAuthenticatedUser, getHelpRequestById);
router.put("/helps/:id/status", isAuthenticatedUser, updateHelpRequest);
router.delete(
  "/admin/help-requests/:id",
  isAuthenticatedUser,
  deleteHelpRequest,
);
module.exports = router;
