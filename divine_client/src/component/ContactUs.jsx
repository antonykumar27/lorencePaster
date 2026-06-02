// src/pages/Contact.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { useCreateHelpRequestMutation } from "../store/volunteerApi"; // 👈 API ഇമ്പോർട്ട് ചെയ്തു
import { toast } from "react-toastify";

// Custom SVG Icons
const TwitterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.26-11.498c0-.21-.004-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);
const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0-3.204 .013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.222 0 22.225 0z" />
  </svg>
);

const Contact = () => {
  // ഫോം സ്റ്റേറ്റിൽ phone കൂടി ആഡ് ചെയ്തു ബ്രോ 👇
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createHelpRequest, { isLoading: isSubmitting }] =
    useCreateHelpRequestMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ഒറിജിനൽ ബാക്കെൻഡ് API റിക്വസ്റ്റ് ഇങ്ങോട്ട് മാറ്റി 👇
      await createHelpRequest(formData).unwrap();
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      toast.success("Help request submitted successfully!");
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong. Try again!");
    }
  };

  const contactCards = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "hello@futurewave.com",
      sub: "Response within 24h",
      href: "mailto:hello@futurewave.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "+1 (555) 123-4567",
      sub: "Mon-Fri, 9AM-6PM",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      detail: "123 Innovation Drive",
      sub: "San Francisco, CA 94103",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: FacebookIcon,
      name: "Facebook",
      color: "hover:text-blue-600",
      href: "https://www.facebook.com",
    },
    {
      icon: InstagramIcon,
      name: "Instagram",
      color: "hover:text-pink-500",
      href: "https://www.instagram.com",
    },
    {
      icon: TwitterIcon,
      name: "Twitter",
      color: "hover:text-sky-500",
      href: "https://twitter.com",
    },
    {
      icon: LinkedinIcon,
      name: "LinkedIn",
      color: "hover:text-blue-700",
      href: "https://linkedin.com",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30 transition-colors duration-500">
      {/* Hero / Header */}
      <div className="relative overflow-hidden pt-20 pb-12 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl -z-10" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4 border border-indigo-200 dark:border-indigo-800">
            <Sparkles size={16} /> Need Assistance?
          </span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Request Help
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg mt-4 max-w-xl mx-auto">
            സഹായം ആവശ്യമുള്ളവർ ദയവായി താഴെയുള്ള ഫോം പൂരിപ്പിച്ചു നൽകുക. ഞങ്ങൾ
            നിങ്ങളെ ഉടൻ ബന്ധപ്പെടുന്നതായിരിക്കും.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactCards.map((card, idx) => (
                <motion.a
                  key={idx}
                  variants={itemVariants}
                  href={card.href}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group flex items-center gap-5 p-5 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-110 transition-transform">
                    <card.icon
                      className="text-indigo-600 dark:text-indigo-400"
                      size={24}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {card.detail}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      {card.sub}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-800/30"
            >
              <h3 className="font-semibold flex items-center gap-2 text-slate-800 dark:text-white mb-4">
                <Clock size={18} className="text-indigo-500" /> Support Hours
              </h3>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <p>24/7 Helpline available for emergencies.</p>
                <p>General Queries: Mon - Sat (9:00 AM - 6:00 PM)</p>
              </div>
              <div className="flex gap-4 mt-6 pt-4 border-t border-indigo-200/50 dark:border-indigo-800/30">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className={`p-2 rounded-full bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 ${social.color} transition-colors`}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side – Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="lg:col-span-7"
          >
            <div className="relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 shadow-2xl p-6 md:p-10">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-400/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl -z-10" />
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Submit Help Request
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
                Please fill in accurate details so we can reach out to you
                swiftly.
              </p>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-center gap-3"
                  >
                    <CheckCircle size={20} />
                    <span>
                      Your request has been sent successfully. We will call you
                      soon!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
                      placeholder="hello@example.com"
                    />
                  </div>
                </div>

                {/* 📱 ചോദിച്ചതുപോലെ പുതിയ മൊബൈൽ നമ്പർ ഇൻപുട്ട് ഫീൽഡ് ഇവിടെ നൽകിയിട്ടുണ്ട് 👇 */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}" // 10 അക്ക നമ്പർ നിർബന്ധമാക്കാൻ
                    className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                    Subject / Help Category *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
                    placeholder="e.g., Medical Assistance, Educational Help"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                    Describe your Need *
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none dark:text-white"
                    placeholder="ആവശ്യമായ സഹായത്തെക്കുറിച്ച് ചുരുക്കത്തിൽ വിവരിക്കുക..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Submitting Request..."
                  ) : (
                    <>
                      Submit Request <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

// // src/pages/Contact.jsx
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Send,
//   CheckCircle,
//   Clock,
//   Sparkles,
// } from "lucide-react";

// // Custom SVG Icons (no external dependency)
// const TwitterIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.26-11.498c0-.21-.004-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
//   </svg>
// );

// const InstagramIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
//   </svg>
// );

// const FacebookIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
//   </svg>
// );

// const LinkedinIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.222 0 22.225 0z" />
//   </svg>
// );

// const Contact = () => {
//   // ... (rest of your state and handlers remain exactly the same)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setIsSubmitted(true);
//       setFormData({ name: "", email: "", subject: "", message: "" });
//       setTimeout(() => setIsSubmitted(false), 4000);
//     }, 1500);
//   };

//   const contactCards = [
//     {
//       icon: Mail,
//       title: "Email Us",
//       detail: "hello@futurewave.com",
//       sub: "Response within 24h",
//       href: "mailto:hello@futurewave.com",
//     },
//     {
//       icon: Phone,
//       title: "Call Us",
//       detail: "+1 (555) 123-4567",
//       sub: "Mon-Fri, 9AM-6PM",
//       href: "tel:+15551234567",
//     },
//     {
//       icon: MapPin,
//       title: "Visit Us",
//       detail: "123 Innovation Drive",
//       sub: "San Francisco, CA 94103",
//       href: "#",
//     },
//   ];
//   const socialLinks = [
//     {
//       icon: FacebookIcon,
//       name: "Facebook",
//       color: "hover:text-blue-600",
//       href: "https://www.facebook.com/your-church-page", // 👈 നിന്റെ ലിങ്ക് ഇവിടെ നൽകുക
//     },
//     {
//       icon: InstagramIcon,
//       name: "Instagram",
//       color: "hover:text-pink-500",
//       href: "https://www.instagram.com/your-church-profile",
//     },
//     {
//       icon: TwitterIcon,
//       name: "Twitter",
//       color: "hover:text-sky-500",
//       href: "https://twitter.com/your-profile",
//     },
//     {
//       icon: LinkedinIcon,
//       name: "LinkedIn",
//       color: "hover:text-blue-700",
//       href: "https://linkedin.com/company/your-trust",
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 30, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 200, damping: 20 },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30 transition-colors duration-500">
//       {/* Hero / Header */}
//       <div className="relative overflow-hidden pt-20 pb-12 px-6">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl -z-10" />
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center max-w-3xl mx-auto"
//         >
//           <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4 border border-indigo-200 dark:border-indigo-800">
//             <Sparkles size={16} /> Get in touch
//           </span>
//           <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
//             Let's Talk
//           </h1>
//           <p className="text-slate-600 dark:text-slate-300 text-lg mt-4 max-w-xl mx-auto">
//             Have a project in mind or just want to say hello? We'd love to hear
//             from you.
//           </p>
//         </motion.div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 pb-24">
//         <div className="grid lg:grid-cols-12 gap-8">
//           {/* Left side */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             className="lg:col-span-5 space-y-6"
//           >
//             <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
//               {contactCards.map((card, idx) => (
//                 <motion.a
//                   key={idx}
//                   variants={itemVariants}
//                   href={card.href}
//                   whileHover={{ scale: 1.02, y: -5 }}
//                   className="group flex items-center gap-5 p-5 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300"
//                 >
//                   <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-110 transition-transform">
//                     <card.icon
//                       className="text-indigo-600 dark:text-indigo-400"
//                       size={24}
//                     />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-slate-800 dark:text-white">
//                       {card.title}
//                     </h3>
//                     <p className="text-sm text-slate-600 dark:text-slate-300">
//                       {card.detail}
//                     </p>
//                     <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
//                       {card.sub}
//                     </p>
//                   </div>
//                 </motion.a>
//               ))}
//             </div>

//             <motion.div
//               variants={itemVariants}
//               className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-800/30"
//             >
//               <h3 className="font-semibold flex items-center gap-2 text-slate-800 dark:text-white mb-4">
//                 <Clock size={18} className="text-indigo-500" /> Office Hours
//               </h3>
//               <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
//                 <p>Monday – Friday: 9:00 AM – 6:00 PM (PST)</p>
//                 <p>Saturday: 10:00 AM – 2:00 PM</p>
//                 <p>Sunday: Closed</p>
//               </div>
//               <div className="flex gap-4 mt-6 pt-4 border-t border-indigo-200/50 dark:border-indigo-800/30">
//                 {socialLinks.map((social, idx) => (
//                   <motion.a
//                     key={idx}
//                     href={social.href} // 👈 '#' മാറ്റി ഇതാക്കുക
//                     target="_blank" // 👈 പുതിയ ടാബിൽ ഓപ്പൺ ചെയ്യാൻ
//                     rel="noopener noreferrer" // 👈 സെക്യൂരിറ്റിക്ക് വേണ്ടി
//                     whileHover={{ y: -3 }}
//                     className={`p-2 rounded-full bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 ${social.color} transition-colors`}
//                   >
//                     <social.icon />
//                   </motion.a>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Right side – Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, type: "spring" }}
//             className="lg:col-span-7"
//           >
//             <div className="relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 shadow-2xl p-6 md:p-10">
//               <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-400/20 rounded-full blur-3xl -z-10" />
//               <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl -z-10" />
//               <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
//                 Send us a message
//               </h2>
//               <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
//                 We'll get back to you within 24 hours.
//               </p>

//               <AnimatePresence>
//                 {isSubmitted && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -20, scale: 0.95 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-center gap-3"
//                   >
//                     <CheckCircle size={20} />
//                     <span>
//                       Message sent successfully! We'll reach out soon.
//                     </span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
//                       Your name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
//                       placeholder="John Doe"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
//                       Email address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
//                       placeholder="hello@example.com"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
//                     Subject
//                   </label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
//                     placeholder="How can we help?"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
//                     Message *
//                   </label>
//                   <textarea
//                     name="message"
//                     rows="5"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none dark:text-white"
//                     placeholder="Tell us about your project or inquiry..."
//                   />
//                 </div>
//                 <motion.button
//                   type="submit"
//                   disabled={isSubmitting}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <svg
//                         className="animate-spin h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       Send Message <Send size={18} />
//                     </>
//                   )}
//                 </motion.button>
//                 <p className="text-center text-xs text-slate-400 dark:text-slate-500 pt-2">
//                   This is a demo contact form — no data is stored.
//                 </p>
//               </form>
//             </div>
//           </motion.div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2 }}
//           className="mt-16 rounded-2xl overflow-hidden shadow-lg border border-white/20 dark:border-white/10"
//         >
//           <div className="relative h-64 md:h-80 bg-gradient-to-r from-slate-200 to-indigo-100 dark:from-slate-800 dark:to-indigo-950/50 flex items-center justify-center">
//             <div className="text-center text-slate-500 dark:text-slate-400">
//               <MapPin size={36} className="mx-auto mb-2 text-indigo-500" />
//               <p className="font-medium">Interactive Map (Demo)</p>
//               <p className="text-sm">123 Innovation Drive, San Francisco, CA</p>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Contact;
