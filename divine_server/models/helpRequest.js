const mongoose = require("mongoose");

const HelpRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      // ആവശ്യമെങ്കിൽ മാത്രം വാലിഡേറ്റ് ചെയ്യാം (യൂസർ ഓപ്ഷണൽ ആയി നൽകിയാൽ)
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    subject: {
      type: String,
      required: [true, "Subject/Category is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message description is required"],
      trim: true,
    },
    // അഡ്മിൻ പാനലിൽ മാനേജ് ചെയ്യാൻ സഹായിക്കുന്ന അഡീഷണൽ ഫീൽഡുകൾ 👇
    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Resolved",
        "approved",
        "rejected",
      ],
      default: "Pending",
    },
    amountRequested: {
      type: Number,
      default: 0, // യൂസർക്ക് ഫോമിൽ തുക രേഖപ്പെടുത്താൻ ഫീൽഡ് നൽകുകയാണെങ്കിൽ
    },
    amountApproved: {
      type: Number,
      default: 0, // അഡ്മിൻ അനുവദിക്കുന്ന തുക (Financial/Accounting reporting-ന് ഉപകരിക്കും)
    },
    remarks: {
      type: String, // അഡ്മിന് എന്തെങ്കിലും നോട്ട്സ് എഴുതി വെക്കാൻ
      trim: true,
    },
  },
  {
    timestamps: true, // ഇത് വഴി createdAt, updatedAt ഫീൽഡുകൾ തനിയെ വന്നോളും
  },
);

module.exports = mongoose.model("HelpRequest", HelpRequestSchema);
