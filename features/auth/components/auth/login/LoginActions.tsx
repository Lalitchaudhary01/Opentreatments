"use client";

import { signIn } from "next-auth/react";
import type {
  RegisterPayload,
  VerifyOtpPayload,
  LoginPayload,
} from "./types";

export async function registerUser(
  payload: RegisterPayload
): Promise<{ userId?: string; error?: string }> {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "Registration failed" };
    }

    return { userId: data.userId };
  } catch {
    return { error: "An error occurred during registration" };
  }
}

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

export async function loginUser(payload: LoginPayload) {
  const res = await signIn("credentials", {
    redirect: false,
    email: payload.email,
    password: payload.password,
  });

  if (res?.error) {
    return { error: res.error };
  }

  const sessionRes = await fetch("/api/auth/session");
  const sessionData = await sessionRes.json();

  return { session: sessionData };
}
