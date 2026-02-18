"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

// import { LoginForm } from "@/components/auth/login";
// import { RegisterForm } from "@/components/auth/register";
// import { OtpForm } from "@/components/auth/otp";
import { Button } from "@/components/ui/button";
import { OtpForm } from "../otp";
import { LoginForm } from "../login";
import { RegisterForm } from "../register";

export default function AuthShell() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<"login" | "register" | "verify">("login");
  const [isActive, setIsActive] = useState(false);

  const email = searchParams.get("email") || "";

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

  const toggleActive = () => {
    if (isActive) {
      router.push("/auth?mode=login");
    } else {
      router.push("/auth?mode=register");
    }
  };

  if (mode === "verify") {
    return <OtpForm email={email} />;
  }

  return (
    <div>
      <Button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 z-50 bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
      >
        Back to Home
      </Button>

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 dark:from-gray-800 dark:to-gray-900 relative">
        <div
          className={`relative w-[850px] h-[600px] bg-white dark:bg-gray-800 m-5 rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ${
            isActive ? "active" : ""
          }`}
        >
          {/* Login Side */}
          <motion.div
            className="absolute w-1/2 h-full bg-white dark:bg-gray-800 flex items-center p-6 z-10"
            initial={false}
            animate={{
              right: isActive ? "100%" : "0%",
              opacity: isActive ? 0 : 1,
            }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
          >
            <LoginForm />
          </motion.div>

          {/* Register Side */}
          <motion.div
            className="absolute w-1/2 h-full bg-white dark:bg-gray-800 flex items-center p-6 z-10"
            initial={false}
            animate={{
              left: isActive ? "0%" : "-100%",
              opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
          >
            <RegisterForm />
          </motion.div>

          {/* Toggle Panels */}
          <div className="absolute w-full h-full">
            <motion.div
              className="absolute w-[300%] h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-[150px] z-20"
              initial={false}
              animate={{ left: isActive ? "50%" : "-250%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />

            {/* Left */}
            <motion.div
              className="absolute left-0 w-1/2 h-full text-white flex flex-col justify-center items-center z-30"
              initial={false}
              animate={{
                left: isActive ? "-50%" : "0%",
                opacity: isActive ? 0 : 1,
              }}
              transition={{ duration: 0.7, delay: isActive ? 0.3 : 0.7 }}
            >
              <h1 className="text-3xl font-bold">Hello, Welcome!</h1>
              <p className="my-4">Good to See You Again</p>
              <button
                onClick={toggleActive}
                className="w-40 py-3 border-2 border-white rounded-lg"
              >
                Register
              </button>
            </motion.div>

            {/* Right */}
            <motion.div
              className="absolute right-0 w-1/2 h-full text-white flex flex-col justify-center items-center z-30"
              initial={false}
              animate={{
                right: isActive ? "0%" : "-50%",
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.7, delay: isActive ? 0.7 : 0.3 }}
            >
              <h1 className="text-3xl font-bold">Transparency Starts Here</h1>
              <p className="my-4">Join Us Today</p>
              <button
                onClick={toggleActive}
                className="w-40 py-3 border-2 border-white rounded-lg"
              >
                Login
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
