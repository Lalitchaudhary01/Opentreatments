"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function AuthForm() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<"login" | "register" | "verify">("login");
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  useEffect(() => {
    const m = searchParams.get("mode");
    if (m === "register") {
      setMode("register");
      setIsActive(true);
    } else if (m === "verify") {
      setMode("verify");
    } else {
      setMode("login");
      setIsActive(false);
    }
  }, [searchParams]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    otp: "",
    role: "",
  });

  const roles = {
    login: ["USER", "DOCTOR", "ADMIN", "HOSPITAL", "PHARMACY"],
    register: [
      "USER",
      "DOCTOR",
      "ADMIN",
      "HOSPITAL",
      "PHARMACY",
      "INSURANCE_COMPANY",
    ],
  };

  const getRoleDisplayName = (role: string) => {
    return role.replace("_", " ");
  };

  const toggleActive = () => {
    setIsActive(!isActive);
    setIsRoleDropdownOpen(false);
    if (isActive) {
      router.push("/auth?mode=login");
    } else {
      router.push("/auth?mode=register");
    }
  };

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          confirmPassword: form.confirm,
          role: form.role,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        setUserId(data.userId);
        router.push("/auth?mode=verify");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      alert("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          otp: form.otp,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        alert("Email verified successfully! You can now login.");
        router.push("/auth?mode=login");
      } else {
        alert(data.error || "Verification failed");
      }
    } catch (error) {
      alert("An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (res?.error) {
        alert("Login failed: " + res.error);
        return;
      }

      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();

      if (sessionData?.user?.role !== form.role) {
        alert(`You cannot login as ${form.role} with this account.`);
        return;
      }

      if (form.role === "DOCTOR") router.push("/doctor");
      else if (form.role === "ADMIN") router.push("/admin/doctor");
      else if (form.role === "HOSPITAL") router.push("/Hospitals");
      else if (form.role === "PHARMACY") router.push("/pharmacy/dashboard");
      else router.push("/");
    } catch (error) {
      alert("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  }

  if (mode === "verify") {
    return (
      <div className="min-h-screen flex bg-background text-foreground justify-center items-center">
        <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-4">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center text-white font-bold">
                  O
                </div>
                <span className="text-[#10B981]">Open</span>
                <span className="text-[#1FB6E8]">Treatment</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#10B981]">Verify Email</h1>
            <p className="text-[#1FB6E8] font-semibold mt-2">
              We've sent a verification code to your email
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={(e) => setForm({ ...form, otp: e.target.value })}
              className="border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#10B981] hover:bg-green-700 text-white py-3 rounded-lg transition disabled:opacity-50 font-medium"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 dark:from-gray-800 dark:to-gray-900">
      <div
        className={`relative w-[850px] h-[600px] bg-white dark:bg-gray-800 m-5 rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ${
          isActive ? "active" : ""
        }`}
      >
        {/* Login Form */}
        <motion.div
          className="absolute w-1/2 h-full bg-white dark:bg-gray-800 flex items-center text-gray-800 dark:text-white text-center p-6 z-10"
          initial={false}
          animate={{
            right: isActive ? "100%" : "0%",
            opacity: isActive ? 0 : 1,
          }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
        >
          <div className="w-full overflow-y-auto max-h-full">
            <div className="flex justify-center items-center mb-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/logos.png"
                  alt="Open Treatment Logo"
                  width={130}
                  height={80}
                  className="object-contain"
                />
                <div className="flex items-center gap-2 text-3xl font-bold"></div>
              </div>
            </div>

            <form onSubmit={handleLogin} className="w-full">
              <h1 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                Login
              </h1>

              <div className="relative my-4">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 pr-11 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                />
                <i className="bx bxs-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 dark:text-gray-400"></i>
              </div>

              <div className="relative my-4">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 pr-11 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                />
                <i className="bx bxs-lock-alt absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 dark:text-gray-400"></i>
              </div>

              <div className="mb-3 relative">
                <label className="font-semibold text-xs block mb-1.5 text-left text-gray-800 dark:text-white">
                  Select Role:
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium text-left flex justify-between items-center disabled:opacity-50 text-sm"
                  >
                    <span
                      className={
                        form.role
                          ? "text-gray-800 dark:text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }
                    >
                      {form.role
                        ? getRoleDisplayName(form.role)
                        : "Choose your role"}
                    </span>
                    <i
                      className={`bx bx-chevron-down transform transition-transform duration-200 text-gray-600 dark:text-gray-400 ${
                        isRoleDropdownOpen ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>

                  {isRoleDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                    >
                      {roles["login"].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            setForm({ ...form, role });
                            setIsRoleDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                form.role === role
                                  ? "bg-[#10B981]"
                                  : "bg-gray-300 dark:bg-gray-500"
                              }`}
                            ></div>
                            <span className="text-gray-800 dark:text-white">
                              {getRoleDisplayName(role)}
                            </span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="my-3">
                <a
                  href="#"
                  className="text-xs text-gray-800 dark:text-gray-300 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#10B981] rounded-lg shadow-lg border-none cursor-pointer text-white font-semibold text-base mb-3 disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <p className="text-xs my-2 text-gray-600 dark:text-gray-400">
                or login with social platforms
              </p>

              {/* Trusted Companies Section */}
              {/* <div className="mb-3 py-1">
                <div className="flex justify-center items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span>Trusted by leading companies</span>
                </div>
                <div className="flex justify-center items-center gap-4 opacity-60">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                  <div className="w-6 h-6 bg-purple-500 rounded"></div>
                  <div className="w-6 h-6 bg-red-500 rounded"></div>
                </div>
              </div> */}

              {/* Google Login */}
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  signIn("google", { callbackUrl: "/" });
                }}
                disabled={isLoading}
                className="w-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-white py-2.5 rounded-lg transition flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 mb-2 disabled:opacity-50 text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>

              {/* <div className="flex justify-center gap-2 mt-2">
                <a
                  href="#"
                  className="inline-flex p-1.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-lg text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <i className="bx bxl-facebook"></i>
                </a>
                <a
                  href="#"
                  className="inline-flex p-1.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-lg text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <i className="bx bxl-github"></i>
                </a>
                <a
                  href="#"
                  className="inline-flex p-1.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-lg text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <i className="bx bxl-linkedin"></i>
                </a>
              </div> */}
            </form>
          </div>
        </motion.div>

        {/* Register Form */}
        <motion.div
          className="absolute w-1/2 h-full bg-white dark:bg-gray-800 flex items-center text-gray-800 dark:text-white text-center p-6 z-10"
          initial={false}
          animate={{
            left: isActive ? "0%" : "-100%",
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
        >
          <div className="w-full overflow-y-auto max-h-full">
            <div className="flex justify-center items-center mb-4">
              {" "}
              {/* Reduced margin */}
              <div className="flex items-center gap-3">
                <Image
                  src="/logos.png"
                  alt="Open Treatment Logo"
                  width={120}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>

            <form onSubmit={handleRegister} className="w-full">
              <h1 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                Registration
              </h1>

              <div className="relative my-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 pr-11 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                />
                <i className="bx bxs-user absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 dark:text-gray-400"></i>
              </div>

              <div className="relative my-3">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 pr-11 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                />
                <i className="bx bxs-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 dark:text-gray-400"></i>
              </div>

              <div className="relative my-3">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 pr-11 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                />
                <i className="bx bxs-phone absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 dark:text-gray-400"></i>
              </div>

              <div className="grid grid-cols-2 gap-2 my-3">
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    disabled={isLoading}
                    className="w-full py-2.5 px-3 pr-8 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-xs"
                  />
                  <i className="bx bxs-lock-alt absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 dark:text-gray-400"></i>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={form.confirm}
                    onChange={(e) =>
                      setForm({ ...form, confirm: e.target.value })
                    }
                    disabled={isLoading}
                    className="w-full py-2.5 px-3 pr-8 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-xs"
                  />
                  <i className="bx bxs-lock-alt absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 dark:text-gray-400"></i>
                </div>
              </div>

              <div className="mb-3 relative">
                <label className="font-semibold text-xs block mb-1.5 text-left text-gray-800 dark:text-white">
                  Select Role:
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium text-left flex justify-between items-center disabled:opacity-50 text-sm"
                  >
                    <span
                      className={
                        form.role
                          ? "text-gray-800 dark:text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }
                    >
                      {form.role
                        ? getRoleDisplayName(form.role)
                        : "Choose your role"}
                    </span>
                    <i
                      className={`bx bx-chevron-down transform transition-transform duration-200 text-gray-600 dark:text-gray-400 ${
                        isRoleDropdownOpen ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>

                  {isRoleDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                    >
                      {roles["register"].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            setForm({ ...form, role });
                            setIsRoleDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                form.role === role
                                  ? "bg-[#10B981]"
                                  : "bg-gray-300 dark:bg-gray-500"
                              }`}
                            ></div>
                            <span className="text-gray-800 dark:text-white">
                              {getRoleDisplayName(role)}
                            </span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#10B981] rounded-lg shadow-lg border-none cursor-pointer text-white font-semibold text-base mb-3 disabled:opacity-50"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>

              <p className="text-xs my-2 text-gray-600 dark:text-gray-400">
                or register with social platforms
              </p>

              {/* Trusted Companies Section */}
              {/* <div className="mb-2 py-1">
                <div className="flex justify-center items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span>Trusted by leading companies</span>
                </div>
                <div className="flex justify-center items-center gap-4 opacity-60">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                  <div className="w-6 h-6 bg-purple-500 rounded"></div>
                  <div className="w-6 h-6 bg-red-500 rounded"></div>
                </div>
              </div> */}
            </form>
          </div>
        </motion.div>

        {/* Toggle Box with Animation */}
        <div className="absolute w-full h-full">
          {/* Animated Background Circle */}
          <motion.div
            className="absolute w-[300%] h-full bg-[#10B981] rounded-[150px] z-20"
            initial={false}
            animate={{
              left: isActive ? "50%" : "-250%",
            }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />

          {/* Left Toggle Panel */}
          <motion.div
            className="absolute left-0 w-1/2 h-full text-white flex flex-col justify-center items-center z-30"
            initial={false}
            animate={{
              left: isActive ? "-50%" : "0%",
              opacity: isActive ? 0 : 1,
            }}
            transition={{
              duration: 0.7,
              delay: isActive ? 0.3 : 0.7,
              ease: "easeInOut",
            }}
          >
            <div className="flex flex-col items-center gap-2 mb-3">
              {" "}
              {/* Reduced margin */}
              <div className="flex items-center gap-3">
                {/* <Image
                  src="/logos.png"
                  alt="Open Treatment Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                /> */}
                <div className="flex items-center gap-2 text-3xl font-bold">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#10B981] font-bold">
                    O
                  </div>
                  <span className="text-white">Open</span>
                  <span className="text-white opacity-90">Treatment</span>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold">Hello, Welcome!</h1>
            <p className="text-sm my-4">Good to See You Again</p>
            <p className="text-lg opacity-90 mb-6">
              Continue your journey towards stress-free healthcare
            </p>
            <p className="text-sm my-4">Don't have an account?</p>
            <button
              onClick={toggleActive}
              className="w-40 py-3 bg-transparent border-2 border-white rounded-lg cursor-pointer text-white font-semibold text-lg hover:bg-white hover:text-[#10B981] transition-all"
            >
              Register
            </button>
          </motion.div>

          {/* Right Toggle Panel */}
          <motion.div
            className="absolute right-0 w-1/2 h-full text-white flex flex-col justify-center items-center z-30"
            initial={false}
            animate={{
              right: isActive ? "0%" : "-50%",
              opacity: isActive ? 1 : 0,
            }}
            transition={{
              duration: 0.7,
              delay: isActive ? 0.7 : 0.3,
              ease: "easeInOut",
            }}
          >
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="flex items-center gap-2 text-3xl font-bold">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#10B981] font-bold">
                  O
                </div>
                <span className="text-white">Open</span>
                <span className="text-white opacity-90">Treatment</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold">Transparency Starts Here</h1>
            <p className="text-sm my-4">Join Us Today</p>
            <p className="text-lg opacity-90 mb-6">
              Sign up and know your medical costs upfront
            </p>
            <p className="text-sm my-4">Already have an account?</p>
            <button
              onClick={toggleActive}
              className="w-40 py-3 bg-transparent border-2 border-white rounded-lg cursor-pointer text-white font-semibold text-lg hover:bg-white hover:text-[#10B981] transition-all"
            >
              Login
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Styles */}
      <style jsx>{`
        @media screen and (max-width: 650px) {
          .relative {
            height: calc(100vh - 40px);
          }

          .absolute.w-1/2 {
            width: 100%;
            height: 70%;
            bottom: 0;
          }

          .absolute.w-1/2:nth-child(2) {
            bottom: 30%;
          }

          .absolute.left-[-250%] {
            left: 0;
            top: -270%;
            width: 100%;
            height: 300%;
            border-radius: 20vw;
          }

          .absolute.left-0.w-1/2,
          .absolute.right-[-50%].w-1/2 {
            width: 100%;
            height: 30%;
          }

          .absolute.left-0.w-1/2 {
            top: 0;
          }

          .absolute.right-[-50%].w-1/2 {
            bottom: -30%;
            right: 0;
          }
        }

        @media screen and (max-width: 400px) {
          .absolute.w-1/2 {
            padding: 20px;
          }

          .text-3xl {
            font-size: 30px;
          }
        }
      `}</style>
    </div>
  );
}
