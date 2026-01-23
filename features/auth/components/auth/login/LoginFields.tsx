"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

interface Props {
  form: {
    email: string;
    password: string;
    role: string;
  };
  setForm: (v: any) => void;
  roles: string[];
  isLoading: boolean;
  isRoleDropdownOpen: boolean;
  setIsRoleDropdownOpen: (v: boolean) => void;
  getRoleDisplayName: (r: string) => string;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginFields({
  form,
  setForm,
  roles,
  isLoading,
  isRoleDropdownOpen,
  setIsRoleDropdownOpen,
  getRoleDisplayName,
  onSubmit,
}: Props) {
  return (
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
        </div>
      </div>

      <form onSubmit={onSubmit} className="w-full">
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
            className="w-full py-2.5 px-4 pr-11 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:ring-2 focus:ring-cyan-500"
          />
          <i className="bx bxs-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 dark:text-gray-400"></i>
        </div>

        <div className="relative my-4">
          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            disabled={isLoading}
            className="w-full py-2.5 px-4 pr-11 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:ring-2 focus:ring-cyan-500"
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
              className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-800 dark:text-white font-medium text-left flex justify-between items-center disabled:opacity-50 text-sm focus:ring-2 focus:ring-cyan-500"
            >
              <span
                className={
                  form.role
                    ? "text-gray-800 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }
              >
                {form.role ? getRoleDisplayName(form.role) : "Choose your role"}
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
                {roles.map((role) => (
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
                        className={`w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 ${
                          form.role === role ? "opacity-100" : "opacity-0"
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
          className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 rounded-lg shadow-lg border-none cursor-pointer text-white font-semibold text-base mb-3 disabled:opacity-50 transition-all"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs my-2 text-gray-600 dark:text-gray-400">
          or login with social platforms
        </p>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          disabled={isLoading}
          className="w-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-white py-2.5 rounded-lg transition flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 mb-2 disabled:opacity-50 text-sm"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
