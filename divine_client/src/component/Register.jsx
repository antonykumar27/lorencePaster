// src/pages/Auth.jsx (or replace Register.jsx)
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
} from "lucide-react";
import {
  useLoginAdminMutation,
  useRegisterAdminMutation,
  useLazyCheckEmailQuery,
} from "../store/userApi";
import { useAuth } from "../context/AuthContext"; // പാത്ത് കൃത്യമാണെന്ന് ഉറപ്പാക്കുക
const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // toggle between login / register
  const { login: updateAuthContext } = useAuth(); // AuthContext-ലെ login ഫങ്ഷൻ എടുക്കുന്നു
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
  const [emailStatus, setEmailStatus] = useState({
    isValid: false,
    isChecking: false,
    isAdmin: false,
    message: "",
  });
  const storeAuthData = (userData, token) => {
    const authData = {
      user: { ...userData },
      token: token,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("auth", JSON.stringify(authData));
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    return authData;
  };

  // API hooks
  const [register, { isLoading: isRegistering }] = useRegisterAdminMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginAdminMutation();
  const [checkEmail] = useLazyCheckEmailQuery();

  // Email validation for registration
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

  // Handle registration
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

    if (emailStatus.isAdmin)
      formData.append("adminSecretCode", adminSecretCode);

    try {
      const res = await register(formData).unwrap();
      toast.success(res.message || "Registration successful! Please login.");
      setIsLogin(true); // switch to login form
      // clear fields
      setName("");
      setEmail("");
      setPassword("");
      setMobileNumber("");
      setAdminSecretCode("");
    } catch (err) {
      toast.error(err.data?.message || "Registration failed");
    }
  };

  // Handle login
  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login clicked, Email:", loginEmail); // ഇത് പ്രിന്റ് ആകുന്നുണ്ടോ?

    try {
      const res = await login({
        email: loginEmail,
        password: loginPassword,
      }).unwrap();

      console.log("API Response:", res); // ഇവിടെയാണ് മെയിൻ പ്രശ്നം, res കൃത്യമാണോ?

      // Auth.jsx - handleLogin-ൽ
      if (res && res.token && res.user) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        // Context-ലേക്ക് ഡാറ്റ കൈമാറുക
        updateAuthContext(res.user, res.token);

        toast.success("Login successful!");

        // ഒരു ചെറിയ setTimeout കൊടുത്താൽ സ്റ്റോറേജ് പൂർണ്ണമായും റൈറ്റ് ആകുന്നത് വരെ വെയിറ്റ് ചെയ്യാം
        setTimeout(() => {
          navigate("/dashboard");
        }, 100);
      }
    } catch (err) {
      console.error("Login Error:", err); // ഇവിടെ എന്തെങ്കിലും എറർ വരുന്നുണ്ടോ?
      toast.error(err.data?.message || "Invalid credentials");
    }
  };

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
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${isLogin ? "bg-blue-600 text-white shadow-lg" : "text-slate-600 dark:text-slate-400"}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${!isLogin ? "bg-blue-600 text-white shadow-lg" : "text-slate-600 dark:text-slate-400"}`}
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
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500"
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
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
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-70"
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
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500"
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
                <div className="relative group">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500"
                    size={19}
                  />
                  <input
                    type="tel" // 'number'-ന് പകരം 'tel' നൽകുന്നതാണ് കൂടുതൽ നല്ലത്
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)} // കറക്റ്റ് സെറ്റർ ആഡ് ചെയ്തു ബ്രോ
                    className={inputStyle}
                    required
                  />
                </div>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500"
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
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showRegisterPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
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
                <button
                  type="submit"
                  disabled={isRegistering || emailStatus.isChecking}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-70"
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
