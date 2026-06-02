const mongoose = require("mongoose");
const Donation = require("../models/donation");
const PrayerRequest = require("../models/prayerRequest");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
const getRazorpayKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};
const createDonationOrder = async (req, res) => {
  try {
    const { amount, name, email, phone, purpose } = req.body;

    // 1. അടിസ്ഥാന വാലിഡേഷൻ
    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, error: "കൃത്യമായ ഒരു തുക രേഖപ്പെടുത്തുക" });
    }
    if (!name || !phone) {
      return res
        .status(400)
        .json({ success: false, error: "പേരും ഫോൺ നമ്പറും നിർബന്ധമാണ്" });
    }

    // 2. ഡാറ്റാബേസിൽ ആദ്യം 'Pending' സ്റ്റാറ്റസിൽ എൻട്രി ക്രിയേറ്റ് ചെയ്യുന്നു (session ഒഴിവാക്കി)
    const donation = await Donation.create({
      name,
      email: email || null,
      phone,
      purpose: purpose || "General Donation",
      amount: Number(amount),
      status: "Pending",
      razorpayOrderId: `temp_${Date.now()}`,
    });

    // 3. Razorpay ഒഫീഷ്യൽ ഓർഡർ ജനറേറ്റ് ചെയ്യുന്നു
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: Math.round(Number(amount) * 100), // റുപ്പീസ് പൈസയാക്കി മാറ്റുന്നു
      currency: "INR",
      receipt: `DON_${donation._id.toString().slice(-6)}_${Date.now().toString().slice(-4)}`,
      notes: {
        donationId: donation._id.toString(),
        name,
        purpose,
      },
    });

    // 4. താൽക്കാലിക ഐഡി മാറ്റി യഥാർത്ഥ Razorpay Order ID അപ്ഡേറ്റ് ചെയ്യുന്നു
    donation.razorpayOrderId = razorpayOrder.id;
    await donation.save();

    res.status(201).json({
      success: true,
      message: "Donation order created successfully",
      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
      donationId: donation._id,
    });
  } catch (error) {
    // 💡 യഥാർത്ഥ എറർ എന്താണെന്ന് ടെർമിനലിൽ കാണാൻ ഇത് സഹായിക്കും
    console.error("Donation Order Creation Error Actual:", error);
    res
      .status(500)
      .json({ success: false, error: "ഓർഡർ ക്രിയേറ്റ് ചെയ്യാൻ സാധിച്ചില്ല" });
  }
};

const verifyDonationPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // 💡 ലോഗ് ഇൻഷുറൻസ്: കീ കറക്റ്റ് ആയി ഇവിടെ കിട്ടുന്നുണ്ടോ എന്ന് ഉറപ്പുവരുത്താൻ
    if (!process.env.RAZORPAY_SECRET) {
      const path = require("path");
      require("dotenv").config({
        path: path.join(__dirname, "../config/.env"),
      });
    }

    // 1. Razorpay സിഗ്നേച്ചർ സുരക്ഷിതമായി വെരിഫൈ ചെയ്യുന്നു
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: "Security signature mismatch! Invalid payment.",
      });
    }

    // 2. ഈ ഓർഡർ ഐഡിയിലുള്ള ഡൊണേഷൻ ഡാറ്റാബേസിൽ ഉണ്ടോ എന്ന് നോക്കുന്നു (session ഒഴിവാക്കി)
    const donation = await Donation.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!donation) {
      return res
        .status(404)
        .json({ success: false, error: "Donation record not found" });
    }

    // 3. ഓൾറെഡി പൈസ കിട്ടിയതാണെങ്കിൽ വെറുതെ റിട്ടേൺ ചെയ്യുന്നു
    if (donation.status === "Completed") {
      return res.json({
        success: true,
        message: "Payment already verified successfully",
      });
    }

    // 4. സ്റ്റാറ്റസ് 'Completed' ആയി അപ്ഡേറ്റ് ചെയ്യുന്നു
    donation.status = "Completed";
    donation.razorpayPaymentId = razorpay_payment_id;
    donation.razorpaySignature = razorpay_signature;
    await donation.save();

    return res.json({
      success: true,
      message: "✨ സംഭാവന വിജയകരമായി രേഖപ്പെടുത്തി. അങ്ങയുടെ സഹായത്തിന് നന്ദി!",
      data: {
        donationId: donation._id,
        amount: donation.amount,
        purpose: donation.purpose,
      },
    });
  } catch (error) {
    console.error("Donation Verification Error Actual:", error);
    return res
      .status(500)
      .json({ success: false, error: "Payment verification failed" });
  }
};
const getAllDonations = async (req, res) => {
  try {
    // ഏറ്റവും പുതിയ സംഭാവനകൾ ആദ്യം വരാൻ (status: 'Completed' ഉള്ളവ മാത്രം കാണിക്കാം)
    const donations = await Donation.find({ status: "Completed" }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });
  } catch (error) {
    console.error("Fetch Donations Error:", error);
    res
      .status(500)
      .json({ success: false, error: "വിവരങ്ങൾ ശേഖരിക്കാൻ സാധിച്ചില്ല" });
  }
};
// CREATE a new prayer request
const createPrayerRequest = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    // 1. Basic validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: "ദയവായി നിങ്ങളുടെ പേര് രേഖപ്പെടുത്തുക",
      });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "ദയവായി പ്രാർത്ഥനാ വിവരങ്ങൾ രേഖപ്പെടുത്തുക",
      });
    }

    // 2. Create the prayer request in the database
    const prayerRequest = await PrayerRequest.create({
      name: name.trim(),
      phone: phone?.trim() || "",
      email: email?.trim() || "",
      subject: subject || "General",
      message: message.trim(),
      status: "pending", // default status
      ipAddress: req.ip || req.socket.remoteAddress,
    });

    // 3. Send success response
    res.status(201).json({
      success: true,
      message: "Prayer request submitted successfully",
      data: {
        id: prayerRequest._id,
        name: prayerRequest.name,
        subject: prayerRequest.subject,
        createdAt: prayerRequest.createdAt,
      },
    });
  } catch (error) {
    console.error("Prayer Request Creation Error:", error);
    res.status(500).json({
      success: false,
      error:
        "പ്രാർത്ഥന അഭ്യർത്ഥന സമർപ്പിക്കാൻ സാധിച്ചില്ല. വീണ്ടും ശ്രമിക്കുക.",
    });
  }
};

// GET all prayer requests (latest first)
const getPrayerRequests = async (req, res) => {
  try {
    // Optional query filters (e.g., ?status=pending)
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const prayerRequests = await PrayerRequest.find(filter)
      .sort({ createdAt: -1 }) // newest first
      .select("-__v"); // exclude version field

    res.status(200).json({
      success: true,
      count: prayerRequests.length,
      data: prayerRequests,
    });
  } catch (error) {
    console.error("Fetch Prayer Requests Error:", error);
    res.status(500).json({
      success: false,
      error: "പ്രാർത്ഥന അഭ്യർത്ഥനകൾ ലഭ്യമാക്കാൻ സാധിച്ചില്ല",
    });
  }
};
// controllers/prayerRequestController.js (add this function)
const updatePrayerRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["pending", "prayed", "completed"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status. Allowed: pending, prayed, completed",
      });
    }

    // Find and update
    const updated = await PrayerRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: "Prayer request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update Prayer Request Status Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update prayer request status",
    });
  }
};
module.exports = {
  getRazorpayKey,
  createDonationOrder,
  verifyDonationPayment,
  getAllDonations,
  createPrayerRequest,
  getPrayerRequests,
  updatePrayerRequestStatus,
};
