import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  HeartHandshake,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useCreateVolunteerMutation } from "../store/VolunteerApi";

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interestedArea: "food",
    skills: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [createVolunteer, { isLoading }] = useCreateVolunteerMutation();

  // Basic validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field while typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createVolunteer(formData).unwrap();
      setSuccess(true);
      // Reset form after 3 seconds? Optional
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          interestedArea: "food",
          skills: "",
          message: "",
        });
      }, 4000);
    } catch (err) {
      console.error("Failed to save volunteer:", err);
      setErrors({ api: "Submission failed. Please try again later." });
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const shakeAnimation = {
    shake: { x: [-5, 5, -3, 3, 0], transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 px-4 relative overflow-hidden">
      {/* Animated background gradient (trendy 2026) */}
      <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="inline-flex p-4 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-xl mb-5"
          >
            <HeartHandshake size={36} strokeWidth={1.5} />
          </motion.div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Become a Volunteer
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-3 text-lg max-w-xl mx-auto">
            Your time & skills can bring hope. Join Divine Hands today.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="backdrop-blur-md bg-white/40 dark:bg-slate-800/40 rounded-3xl border border-white/30 dark:border-slate-700/50 shadow-2xl p-8 md:p-12 text-center"
            >
              <div className="w-20 h-20 mx-auto bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl shadow-lg mb-5">
                ✓
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                Registration Successful! 🎉
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-3">
                Our team will contact you soon. Thank you for your generous
                heart!
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="backdrop-blur-md bg-white/50 dark:bg-slate-800/40 rounded-3xl border border-white/30 dark:border-slate-700/50 shadow-2xl p-6 md:p-10 space-y-6"
            >
              {errors.api && (
                <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-xl text-center">
                  {errors.api}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <div className="relative group">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition"
                      size={18}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-slate-200 dark:border-slate-700 focus:ring-amber-500"
                      } bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm dark:text-white focus:outline-none focus:ring-2 transition-all`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <motion.p
                      variants={shakeAnimation}
                      animate="shake"
                      className="text-red-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle size={14} /> {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative group">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition"
                      size={18}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.email
                          ? "border-red-500"
                          : "border-slate-200 dark:border-slate-700"
                      } bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      variants={shakeAnimation}
                      animate="shake"
                      className="text-red-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle size={14} /> {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative group">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition"
                      size={18}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.phone
                          ? "border-red-500"
                          : "border-slate-200 dark:border-slate-700"
                      } bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  {errors.phone && (
                    <motion.p
                      variants={shakeAnimation}
                      animate="shake"
                      className="text-red-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle size={14} /> {errors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Interested Area */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Area of Interest *
                  </label>
                  <select
                    name="interestedArea"
                    value={formData.interestedArea}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  >
                    <option value="food">🍲 Emergency Food Support</option>
                    <option value="education">📚 Education Support</option>
                    <option value="medical">🏥 Medical / Healthcare</option>
                    <option value="community">🤝 Community Projects</option>
                  </select>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Skills / Profession
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  placeholder="e.g., Teaching, Driving, Medical, IT, Cooking..."
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  How would you like to help?
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  placeholder="Share your ideas, availability, or anything else..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application <Send size={18} />
                  </>
                )}
              </motion.button>

              <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                We respect your privacy. Your information is safe with us.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Volunteer;
