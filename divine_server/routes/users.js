const express = require("express");
// 💡 കൺട്രോളർ ഫയൽ പേര് കൃത്യമായിരിക്കണം.
// ബ്രോയുടെ കോഡ് പ്രകാരം ഇത് ഒരു ഫയലിലാണെങ്കിൽ, താഴെ പറയുന്ന പോലെ മാറ്റുക:
const { register, login, checkAdminEmail } = require("../controller/user");
const { multerMiddleware } = require("../config/cloudinary");
const router = express.Router();

// റൂട്ടുകൾ
router.post("/check-email", checkAdminEmail); // multer ആവശ്യമില്ലെങ്കിൽ കളയുക
router.post("/register", multerMiddleware, register);
router.post("/login", login);

module.exports = router;
