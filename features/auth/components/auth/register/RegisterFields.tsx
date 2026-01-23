"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  form: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirm: string;
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

export function RegisterFields({
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
            width={120}
            height={80}
            className="object-contain"
          />
        </div>
      </div>

      <form onSubmit={onSubmit} className="w-full">
        <h1 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
          Registration
        </h1>

        <input
          className="w-full py-2.5 px-4 mb-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full py-2.5 px-4 mb-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full py-2.5 px-4 mb-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-2 mb-3">
          <input
            type="password"
            className="py-2.5 px-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <input
            type="password"
            className="py-2.5 px-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
            placeholder="Confirm"
            value={form.confirm}
            onChange={(e) =>
              setForm({ ...form, confirm: e.target.value })
            }
          />
        </div>

        <div className="mb-3 relative">
          <button
            type="button"
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-left"
          >
            {form.role
              ? getRoleDisplayName(form.role)
              : "Choose your role"}
          </button>

          {isRoleDropdownOpen && (
            <motion.div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setForm({ ...form, role });
                    setIsRoleDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left"
                >
                  {getRoleDisplayName(role)}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
