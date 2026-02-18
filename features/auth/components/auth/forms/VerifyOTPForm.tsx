"use client";

import { useRouter } from "next/navigation";
import Logo from "../shared/Logo";
import { VerifyFormData } from "../types/auth.types";

interface VerifyOTPFormProps {
  form: VerifyFormData;
  setForm: (form: VerifyFormData) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function VerifyOTPForm({ form, setForm, isLoading, onSubmit }: VerifyOTPFormProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex bg-background text-foreground justify-center items-center relative">
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 z-50 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-lg"
      >
        <i className="bx bx-arrow-back text-lg"></i>
        Back to Home
      </button>

      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-4">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
            Verify Email
          </h1>
          <p className="text-cyan-600 font-semibold mt-2">
            We@aposve sent a verification code to your email
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={(e) => setForm({ ...form, otp: e.target.value })}
            className="border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white py-3 rounded-lg transition disabled:opacity-50 font-medium"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}