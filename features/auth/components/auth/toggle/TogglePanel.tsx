"use client";

import { motion } from "framer-motion";
import Logo from "../shared/Logo";

interface TogglePanelProps {
  position: "left" | "right";
  isActive: boolean;
  title: string;
  description: string;
  buttonText: string;
  onToggle: () => void;
  showWelcome?: boolean;
}

export default function TogglePanel({
  position,
  isActive,
  title,
  description,
  buttonText,
  onToggle,
  showWelcome = false,
}: TogglePanelProps) {
  const isLeft = position === "left";
  
  return (
    <motion.div
      className={`absolute ${isLeft ? "left-0" : "right-0"} w-1/2 h-full text-white flex flex-col justify-center items-center z-30`}
      initial={false}
      animate={{
        [isLeft ? "left" : "right"]: isActive ? (isLeft ? "-50%" : "0%") : (isLeft ? "0%" : "-50%"),
        opacity: isActive ? (isLeft ? 0 : 1) : (isLeft ? 1 : 0),
      }}
      transition={{
        duration: 0.7,
        delay: isActive ? (isLeft ? 0.3 : 0.7) : (isLeft ? 0.7 : 0.3),
        ease: "easeInOut",
      }}
    >
      <div className="flex flex-col items-center gap-2 mb-3">
        <Logo size="lg" showText={true} />
      </div>
      
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm my-4">{description}</p>
      
      {showWelcome && (
        <p className="text-lg opacity-90 mb-6 text-center px-4 max-w-md mx-auto leading-relaxed">
          Continue your journey towards stress-free healthcare
        </p>
      )}
      
      <p className="text-sm my-4">
        {isLeft ? "Don't have an account?" : "Already have an account?"}
      </p>
      
      <button
        onClick={onToggle}
        className="w-40 py-3 bg-transparent border-2 border-white rounded-lg cursor-pointer text-white font-semibold text-lg hover:bg-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-teal-500 transition-all"
      >
        {buttonText}
      </button>
    </motion.div>
  );
}