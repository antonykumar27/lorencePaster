const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema(
  {
    // 1. യൂസറുടെ വിവരങ്ങൾ (ബ്രോ അയച്ച Payload)
    name: {
      type: String,
      required: [true, "പേര് നിർബന്ധമാണ്"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "ഫോൺ നമ്പർ നിർബന്ധമാണ്"],
    },
    purpose: {
      type: String,
      required: true,
      enum: [
        "General Donation",
        "Poor Support",
        "Ministry Support",
        "Building Fund",
      ],
      default: "General Donation",
    },
    amount: {
      type: Number,
      required: [true, "തുക നിർബന്ധമാണ്"],
    },

    // 2. Razorpay മായി ബന്ധപ്പെട്ട വിവരങ്ങൾ (തുക ട്രാക്ക് ചെയ്യാൻ)
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true, // ഒരു ഓർഡറിന് ഒരു ഐഡി മാത്രം
    },
    razorpayPaymentId: {
      type: String, // പൈസ സക്സസ് ആകുമ്പോൾ മാത്രം Razorpay തരുന്ന ഐഡി
      default: null,
    },
    razorpaySignature: {
      type: String, // പേയ്‌മെന്റ് സുരക്ഷിതമാണെന്ന് വെരിഫൈ ചെയ്യാനുള്ള സിഗ്നേച്ചർ
      default: null,
    },

    // 3. പേയ്‌മെന്റ് സ്റ്റാറ്റസ്
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending", // ആദ്യ ഘട്ടത്തിൽ സ്റ്റാറ്റസ് Pending ആയിരിക്കും
    },
  },
  {
    timestamps: true, // ഇത് ഉണ്ടെങ്കിൽ എന്ന് തന്നു (createdAt, updatedAt) എന്ന് ഓട്ടോമാറ്റിക് ആയി വീഴും
  },
);

module.exports = mongoose.model("Donation", DonationSchema);
