"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyOtp } from "./OtpActions";
import { OtpInputs } from "./OtpInputs";

interface Props {
  email: string;
}

export default function OtpForm({ email }: Props) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await verifyOtp({ email, otp });

    if (error) {
      alert(error);
    } else {
      alert("Email verified successfully! You can now login.");
      router.push("/auth?mode=login");
    }

    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground justify-center items-center relative">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
            Verify Email
          </h1>
          <p className="text-cyan-600 font-semibold mt-2">
            We've sent a verification code to your email
          </p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <OtpInputs otp={otp} setOtp={setOtp} isLoading={isLoading} />

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
