const express = require("express");
const router = express.Router();

// 💡 ബ്രോയുടെ കൺട്രോളർ ഫയൽ കിടക്കുന്ന കറക്റ്റ് ഫോൾഡറും ഫയൽ നെയിമും നൽകുക:
const {
  getRazorpayKey,
  createDonationOrder,
  verifyDonationPayment,
  getAllDonations,
  createPrayerRequest,
  getPrayerRequests,
  updatePrayerRequestStatus,
} = require("../controller/razorpayPayment"); // ഫോൾഡർ 'controllers' ആണെങ്കിൽ അങ്ങനെ നൽകുക

// /api/v1/users/razorpay-key
router.get("/razorpay-key", getRazorpayKey);
router.get("/donations", getAllDonations);
// /api/v1/users/donate
router.post("/donate", createDonationOrder);
router.post("/prayer-request", createPrayerRequest);
router.put("/prayer-request/:id", updatePrayerRequestStatus);
router.get("/prayer-requests", getPrayerRequests);

// /api/v1/users/verify
router.post("/verify", verifyDonationPayment);

module.exports = router;
