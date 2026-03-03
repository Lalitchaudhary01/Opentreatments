"use client";

import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import { addOfflinePatient } from "../../appointments/actions/addOfflinePatient";
import { useRouter } from "next/navigation";

export function AddOfflinePatientModal({
  doctorId,
  triggerLabel = "Add Patient",
  triggerClassName,
  defaultOpen = false,
}: {
  doctorId: string;
  triggerLabel?: string;
  triggerClassName?: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null); // 👈 Add ref
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("doctorId", doctorId);
    
    const result = await addOfflinePatient(formData);
    
    if (result.success) {
      // 👇 Fix: Use ref to reset form
      if (formRef.current) {
        formRef.current.reset();
      }
      setIsOpen(false);
      router.refresh();
      alert("✅ Patient added!");
    } else {
      setError(result.error || "Something went wrong");
    }
    
    setLoading(false);
  }

  // Close on outside click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      setError("");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          triggerClassName ||
          "inline-flex h-[29px] items-center gap-[5px] rounded-lg bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#2563eb]"
        }
      >
        <Plus className="h-[13px] w-[13px]" />
        {triggerLabel}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]"
          onClick={handleBackdropClick}
        >
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] shadow-2xl">
            <div className="border-b border-slate-200 dark:border-white/[0.07] px-6 py-5">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Register Patient</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-[#94A3B8]">Create a new patient profile</p>
            </div>

            {error && (
              <div className="mx-6 mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <form 
              ref={formRef} // 👈 Attach ref
              onSubmit={handleSubmit} 
              className="p-6 space-y-4"
            >
              <input type="hidden" name="doctorId" value={doctorId} />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-[#94A3B8]">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="h-10 w-full rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-[#111827] px-3 text-sm text-slate-900 dark:text-slate-100 outline-none transition-colors focus:border-blue-400"
                    placeholder="Anika"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-[#94A3B8]">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    className="h-10 w-full rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-[#111827] px-3 text-sm text-slate-900 dark:text-slate-100 outline-none transition-colors focus:border-blue-400"
                    placeholder="Sharma"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-[#94A3B8]">Phone</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    pattern="[0-9]{10}"
                    className="h-10 w-full rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-[#111827] px-3 text-sm text-slate-900 dark:text-slate-100 outline-none transition-colors focus:border-blue-400"
                    placeholder="9876543210"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-[#94A3B8]">DOB</label>
                  <input
                    type="date"
                    name="dob"
                    className="h-10 w-full rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-[#111827] px-3 text-sm text-slate-900 dark:text-slate-100 outline-none transition-colors focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-[#94A3B8]">Gender</label>
                  <select
                    name="patientGender"
                    className="h-10 w-full rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-[#111827] px-3 text-sm text-slate-900 dark:text-slate-100 outline-none transition-colors focus:border-blue-400"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-[#94A3B8]">Blood Group</label>
                  <select
                    name="bloodGroup"
                    className="h-10 w-full rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-[#111827] px-3 text-sm text-slate-900 dark:text-slate-100 outline-none transition-colors focus:border-blue-400"
                  >
                    <option value="">Select</option>
                    <option value="O+">O+</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                    <option value="O-">O-</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-[#94A3B8]">City</label>
                <input
                  type="text"
                  name="city"
                  className="h-10 w-full rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-[#111827] px-3 text-sm text-slate-900 dark:text-slate-100 outline-none transition-colors focus:border-blue-400"
                  placeholder="Pune"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-[#3b82f6] py-2 text-sm font-medium text-white transition hover:bg-[#2563eb] disabled:opacity-50"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setError("");
                  }}
                  className="flex-1 rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-100 dark:bg-white/5 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 transition hover:bg-slate-200 dark:hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
