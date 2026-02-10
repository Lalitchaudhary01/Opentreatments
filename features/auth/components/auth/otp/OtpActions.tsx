"use client";

import type { VerifyOtpPayload } from "./types";

export async function verifyOtp(
  payload: VerifyOtpPayload
): Promise<{ success?: boolean; error?: string }> {
  try {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "Verification failed" };
    }

    return { success: true };
  } catch {
    return { error: "An error occurred during verification" };
  }
}
