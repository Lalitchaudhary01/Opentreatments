"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// ✅ Clean imports - directly from index files
;
import { LoginForm, RegisterForm, VerifyOTPForm } from "./forms";
import { ToggleBox, TogglePanel } from "./toggle";
import { useAuthForm, useAuthMode } from "./hooks";
// Shared components alag se import karo agar zaroorat ho

export default function AuthFormWrapper() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const router = useRouter();
  
  const { mode, isActive, toggleMode } = useAuthMode();
  const {
    form,
    setForm,
    isLoading,
    handleRegister,
    handleVerifyOtp,
    handleLogin,
  } = useAuthForm();

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  if (mode === "verify") {
    return (
      <VerifyOTPForm 
        form={form} 
        setForm={setForm}
        isLoading={isLoading} 
        onSubmit={handleVerifyOtp} 
      />
    );
  }

  return (
    <div>
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 z-50 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-lg"
      >
        <i className="bx bx-arrow-back text-lg"></i>
        Back to Home
      </button>
      
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 dark:from-gray-800 dark:to-gray-900 relative">
        <div className={`relative w-[850px] h-[600px] bg-white dark:bg-gray-800 m-5 rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ${isActive ? "active" : ""}`}>
          
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
            <LoginForm 
              form={form} 
              setForm={setForm}
              isLoading={isLoading} 
              onSubmit={handleLogin} 
            />
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
            <RegisterForm 
              form={form} 
              setForm={setForm}
              isLoading={isLoading} 
              onSubmit={handleRegister} 
            />
          </motion.div>

          {/* Toggle Box */}
          <ToggleBox isActive={isActive} />

          {/* Left Toggle Panel */}
          <TogglePanel
            position="left"
            isActive={isActive}
            title="Hello, Welcome!"
            description="Good to See You Again"
            buttonText="Register"
            onToggle={toggleMode}
            showWelcome={true}
          />

          {/* Right Toggle Panel */}
          <TogglePanel
            position="right"
            isActive={isActive}
            title="Transparency Starts Here"
            description="Join Us Today"
            buttonText="Login"
            onToggle={toggleMode}
          />
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
    </div>
  );
}