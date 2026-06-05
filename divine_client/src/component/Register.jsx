// src/pages/Auth.jsx
import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Phone,
  Upload,
  Image as ImageIcon,
  X,
} from "lucide-react";
import {
  useLoginAdminMutation,
  useRegisterAdminMutation,
  useLazyCheckEmailQuery,
} from "../store/UserApi";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { login: updateAuthContext } = useAuth();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register state
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [adminSecretCode, setAdminSecretCode] = useState("");
  const [selectedRole, setSelectedRole] = useState("common_user"); // "common_user" or "church_member"
  const [profileImage, setProfileImage] = useState(null); // File object
  const [imagePreview, setImagePreview] = useState(null);
  const [emailStatus, setEmailStatus] = useState({
    isValid: false,
    isChecking: false,
    isAdmin: false,
    message: "",
  });

  // Image upload handlers
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  // API hooks
  const [register, { isLoading: isRegistering }] = useRegisterAdminMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginAdminMutation();
  const [checkEmail] = useLazyCheckEmailQuery();

  // Email validation (admin detection)
  const handleEmailChange = useCallback(
    async (e) => {
      const emailValue = e.target.value;
      setEmail(emailValue);
      setAdminSecretCode("");

      if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        setEmailStatus({
          isValid: false,
          isChecking: false,
          isAdmin: false,
          message: "Enter valid email",
        });
        return;
      }

      setEmailStatus((prev) => ({
        ...prev,
        isChecking: true,
        message: "Checking...",
      }));
      try {
        const res = await checkEmail(emailValue).unwrap();
        const isAdmin = res.message === "this is admin email";
        setEmailStatus({
          isValid: true,
          isChecking: false,
          isAdmin,
          message: isAdmin
            ? "Admin email – secret code required"
            : "Email available",
        });
      } catch (err) {
        setEmailStatus({
          isValid: true,
          isChecking: false,
          isAdmin: false,
          message: "Email check failed, but you can try",
        });
      }
    },
    [checkEmail],
  );

  // Handle registration with role + image
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name is required");
    if (!email.trim() || !emailStatus.isValid)
      return toast.error("Valid email required");
    if (!password || password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (emailStatus.isAdmin && !adminSecretCode.trim())
      return toast.error("Admin secret code is required");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileNumber", mobileNumber);
    formData.append("password", password);
    formData.append("role", emailStatus.isAdmin ? "admin" : selectedRole); // 👈 role from selection or admin
    if (profileImage) {
      formData.append("media", profileImage); // backend expects field name "profileImage"
    }
    if (emailStatus.isAdmin)
      formData.append("adminSecretCode", adminSecretCode);

    try {
      const res = await register(formData).unwrap();
      toast.success(res.message || "Registration successful! Please login.");
      setIsLogin(true);
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setMobileNumber("");
      setAdminSecretCode("");
      setSelectedRole("common_user");
      removeImage();
    } catch (err) {
      toast.error(err.data?.message || "Registration failed");
    }
  };

  // Login unchanged (but ensure backend returns role)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        email: loginEmail,
        password: loginPassword,
      }).unwrap();
      if (res && res.token && res.user) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        updateAuthContext(res.user, res.token);
        toast.success("Login successful!");
        setTimeout(() => navigate("/dashboard"), 100);
      }
    } catch (err) {
      toast.error(err.data?.message || "Invalid credentials");
    }
  };

  // Styles
  const inputStyle = `
    w-full h-12 pl-11 pr-4 rounded-xl transition-all duration-200
    bg-white dark:bg-slate-900
    border border-slate-200 dark:border-slate-700
    text-slate-900 dark:text-white
    placeholder:text-slate-400 dark:placeholder:text-slate-500
    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Toggle */}
        <div className="flex gap-2 p-1 mb-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              isLogin
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              !isLogin
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            Register
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-2xl font-bold text-center mb-6">
                Welcome Back
              </h2>
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email & Password fields (same as before) */}
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={19}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={inputStyle}
                    required
                  />
                </div>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={19}
                  />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={inputStyle}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showLoginPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition"
                >
                  {isLoggingIn ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    "Login"
                  )}{" "}
                  <ArrowRight size={18} />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-2xl font-bold text-center mb-6">
                Create Account
              </h2>
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Name */}
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={19}
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputStyle}
                    required
                  />
                </div>
                {/* Mobile */}
                <div className="relative group">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={19}
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className={inputStyle}
                    required
                  />
                </div>
                {/* Email */}
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={19}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className={inputStyle}
                    required
                  />
                  {email && emailStatus.message && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {emailStatus.isChecking ? (
                        <Loader2
                          size={18}
                          className="animate-spin text-slate-400"
                        />
                      ) : emailStatus.isAdmin ? (
                        <ShieldCheck size={18} className="text-yellow-500" />
                      ) : (
                        emailStatus.isValid && (
                          <div className="text-green-500 text-xs">✓</div>
                        )
                      )}
                    </div>
                  )}
                </div>
                {email && emailStatus.message && (
                  <div
                    className={`text-xs px-3 py-2 rounded-lg flex items-start gap-2 ${emailStatus.isAdmin ? "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600" : emailStatus.isValid ? "bg-green-50 dark:bg-green-500/10 text-green-600" : "bg-red-50 dark:bg-red-500/10 text-red-600"}`}
                  >
                    {emailStatus.isAdmin && <AlertCircle size={14} />}
                    <span>{emailStatus.message}</span>
                  </div>
                )}

                {/* Role Selection (only for non-admin registration) */}
                {!emailStatus.isAdmin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Role
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="role"
                          value="common_user"
                          checked={selectedRole === "common_user"}
                          onChange={() => setSelectedRole("common_user")}
                          className="text-blue-600"
                        />
                        <span>Common User</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="role"
                          value="church_member"
                          checked={selectedRole === "church_member"}
                          onChange={() => setSelectedRole("church_member")}
                          className="text-blue-600"
                        />
                        <span>Church Member</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Password */}
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={19}
                  />
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="Password (min 6 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputStyle}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowRegisterPassword(!showRegisterPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showRegisterPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {/* Admin Secret Code (if email is admin) */}
                {emailStatus.isAdmin && (
                  <div className="relative group">
                    <ShieldCheck
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500"
                      size={19}
                    />
                    <input
                      type="password"
                      placeholder="Admin Secret Code"
                      value={adminSecretCode}
                      onChange={(e) => setAdminSecretCode(e.target.value)}
                      className={inputStyle}
                      required
                    />
                  </div>
                )}

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Profile Picture (optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 transition">
                      <Upload size={18} />
                      <span className="text-sm">Choose image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5"
                        >
                          <X size={12} className="text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isRegistering || emailStatus.isChecking}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition"
                >
                  {isRegistering ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    "Register"
                  )}{" "}
                  <ArrowRight size={18} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
