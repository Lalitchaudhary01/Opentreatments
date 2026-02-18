"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Role, ROLES, getRoleDisplayName } from "../types/auth.types";

interface RoleDropdownProps {
  selectedRole: Role | "";
  onSelect: (role: Role) => void;
  disabled?: boolean;
}

export default function RoleDropdown({ selectedRole, onSelect, disabled }: RoleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium text-left flex justify-between items-center disabled:opacity-50 text-sm focus:ring-2 focus:ring-cyan-500"
      >
        <span className={selectedRole ? "text-gray-800 dark:text-white" : "text-gray-500 dark:text-gray-400"}>
          {selectedRole ? getRoleDisplayName(selectedRole) : "Choose your role"}
        </span>
        <i className={`bx bx-chevron-down transform transition-transform duration-200 text-gray-600 dark:text-gray-400 ${isOpen ? "rotate-180" : ""}`}></i>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            {ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => {
                  onSelect(role);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border-b border-gray-100 dark:border-gray-600 last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 ${selectedRole === role ? "opacity-100" : "opacity-0"}`}></div>
                  <span className="text-gray-800 dark:text-white">{getRoleDisplayName(role)}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}