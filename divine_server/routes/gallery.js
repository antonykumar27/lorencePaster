const express = require("express");
// 💡 കൺട്രോളർ ഫയൽ പേര് കൃത്യമായിരിക്കണം.
// ബ്രോയുടെ കോഡ് പ്രകാരം ഇത് ഒരു ഫയലിലാണെങ്കിൽ, താഴെ പറയുന്ന പോലെ മാറ്റുക:
const {
  getAllGalleryImages,
  createGalleryImage,
  getGalleryImageById,
  updateGalleryImages,
  deleteGalleryImage,
} = require("../controller/gallery");
const { multerMiddleware } = require("../config/cloudinary");
const router = express.Router();

// റൂട്ടുകൾ

router.post("/", multerMiddleware, createGalleryImage);
router.get("/", getAllGalleryImages);
router.get("/:id", getGalleryImageById);
router.put("/:id", multerMiddleware, updateGalleryImages);
router.delete("/:id", multerMiddleware, deleteGalleryImage);

module.exports = router;
