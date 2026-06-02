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
      if (window.innerWidth >= 1024) {
        // Changed to 1024 to match the lg:flex desktop layout
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
        className={`sticky top-0 z-50 w-full px-4 sm:px-6 py-3 md:py-4 shadow-lg transition-all duration-300 backdrop-blur-md overflow-hidden ${
          darkMode
            ? "bg-slate-950/90 border-b border-white/10"
            : "bg-[#050522]/90 border-b border-white/20"
        } text-white`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          {/* Brand/Logo Area (Left aligned on mobile, side by side on desktop) */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-base sm:text-lg font-bold tracking-wider text-white hover:text-red-400 transition-colors"
            >
              DIVINE MINISTRIES
            </Link>
          </div>

          {/* Desktop Navigation - hidden on mobile, shown on lg+ */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 mx-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-2.5 py-2 text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-red-400 whitespace-nowrap ${
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

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark mode toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ rotate: 15 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-white" />
              )}
            </motion.button>

            {/* Auth buttons - desktop */}
            <div className="hidden lg:flex items-center gap-3">
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

            {/* ✨ Donate Button ✨ */}
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
                className="relative overflow-hidden group bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 sm:gap-2 shadow-md hover:shadow-xl"
              >
                <Heart
                  size={14}
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
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed right-0 top-0 h-full w-[85%] max-w-xs z-50 shadow-2xl p-5 flex flex-col ${
                darkMode
                  ? "bg-slate-900/95 backdrop-blur-xl"
                  : "bg-[#050522]/95 backdrop-blur-xl"
              } text-white lg:hidden`}
            >
              {/* Close button inside panel */}
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-1 flex-1 overflow-y-auto pr-1">
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
                        `block py-2.5 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all hover:bg-white/10 ${
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
              <div className="pt-4 mt-auto border-t border-white/10 space-y-3">
                {user ? (
                  <div className="space-y-2">
                    {user?.isAdmin && (
                      <Link
                        to="/donation-dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-yellow-500/20 text-yellow-400 text-sm font-semibold"
                      >
                        <LayoutDashboard size={16} />
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/admin-login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm transition-colors"
                  >
                    <LogIn size={16} />
                    Login
                  </button>
                )}
                <p className="text-center text-[10px] text-white/40">
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
