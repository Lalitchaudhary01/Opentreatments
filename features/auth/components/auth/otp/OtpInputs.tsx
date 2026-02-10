"use client";

interface Props {
  otp: string;
  setOtp: (v: string) => void;
  isLoading: boolean;
}

export function OtpInputs({ otp, setOtp, isLoading }: Props) {
  return (
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      disabled={isLoading}
      className="border px-4 py-3 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-cyan-500"
      required
    />
  );
}
