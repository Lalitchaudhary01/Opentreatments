"use client";

import type { RegisterPayload } from "./types";

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
