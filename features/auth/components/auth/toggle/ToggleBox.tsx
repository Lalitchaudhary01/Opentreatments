"use client";

import { motion } from "framer-motion";

interface ToggleBoxProps {
  isActive: boolean;
}

export default function ToggleBox({ isActive }: ToggleBoxProps) {
  return (
    <div className="absolute w-full h-full">
      <motion.div
        className="absolute w-[300%] h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-[150px] z-20"
        initial={false}
        animate={{
          left: isActive ? "50%" : "-250%",
        }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
    </div>
  );
}