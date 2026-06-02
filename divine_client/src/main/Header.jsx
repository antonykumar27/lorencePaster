// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LogIn,
  LogOut,
  LayoutDashboard,
  Sun,
  Moon,
  Heart,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Header = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "PROGRAMS", path: "/programs" },
    { name: "GALLERY", path: "/gallery" },
    { name: "DIVINE HANDS", path: "/divine-hands" },
    { name: "PRAYER TIME", path: "/prayerSchedule" },
    { name: "PRAYER REQUEST", path: "/prayer-request" },
    { name: "PRAYER LIST", path: "/prayer-requestList" },
    { name: "VOLUNTEERS", path: "/volunteers" },
    { name: "HELP REQUEST", path: "/help_request" },
    { name: "CONTACT", path: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", damping: 25, stiffness: 200 },
    },
    exit: { opacity: 0, x: "100%", transition: { duration: 0.2 } },
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, type: "spring", stiffness: 300 },
    }),
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 px-4 sm:px-6 py-3 md:py-4 shadow-lg transition-all duration-300 backdrop-blur-md ${
          darkMode
            ? "bg-slate-950/90 border-b border-white/10"
            : "bg-[#050522]/90 border-b border-white/20"
        } text-white`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Desktop Navigation - hidden on mobile, shown on md+ */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-wrap">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-red-400 whitespace-nowrap ${
                    isActive ? "text-red-500" : "text-gray-300"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-amber-500 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile: Show a condensed brand or menu hint? We keep the same layout but nav hidden until menu button */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto md:ml-0">
            {/* Dark mode toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ rotate: 15 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-white" />
              )}
            </motion.button>

            {/* Auth buttons - desktop */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  {user?.isAdmin && (
                    <Link
                      to="/donation-dashboard"
                      className="text-xs font-bold text-yellow-400 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1"
                    >
                      <LayoutDashboard size={14} />
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-xs font-bold text-white hover:text-red-500 transition-colors uppercase tracking-wider flex items-center gap-1"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/admin-login")}
                  className="text-xs font-bold text-white hover:text-red-500 transition-colors uppercase tracking-wider flex items-center gap-1"
                >
                  <LogIn size={14} />
                  Login
                </button>
              )}
            </div>

            {/* ✨ Donate Button - Enhanced ✨ */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 4px 12px rgba(0,0,0,0.1)",
                  "0 6px 18px rgba(220,38,38,0.3)",
                  "0 4px 12px rgba(0,0,0,0.1)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Link
                to="/donate"
                className="relative overflow-hidden group bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-xl"
              >
                <Heart
                  size={16}
                  className="fill-white group-hover:scale-110 transition-transform duration-200"
                />
                <span>DONATE</span>
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-100 transition-transform duration-500 skew-x-12"></span>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay (Fullscreen Slide-in) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed right-0 top-0 h-full w-4/5 max-w-sm z-50 shadow-2xl p-6 flex flex-col ${
                darkMode
                  ? "bg-slate-900/95 backdrop-blur-xl"
                  : "bg-[#050522]/95 backdrop-blur-xl"
              } text-white md:hidden`}
            >
              {/* Close button inside panel */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    custom={i}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block py-3 px-4 rounded-xl text-base font-semibold tracking-wide transition-all hover:bg-white/10 ${
                          isActive
                            ? "bg-gradient-to-r from-red-500/20 to-amber-500/20 text-red-400 border-l-4 border-red-500"
                            : "text-gray-300"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Auth & Footer */}
              <div className="pt-6 mt-auto border-t border-white/20 space-y-4">
                {user ? (
                  <div className="space-y-3">
                    {user?.isAdmin && (
                      <Link
                        to="/donation-dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-yellow-500/20 text-yellow-400 font-semibold"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/admin-login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <LogIn size={18} />
                    Login
                  </button>
                )}
                <p className="text-center text-xs text-white/50">
                  Divine Ministries © 2026
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
