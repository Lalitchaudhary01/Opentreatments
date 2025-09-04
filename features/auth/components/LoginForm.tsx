"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<"login" | "register" | "verify">("login");
  const [emailForOtp, setEmailForOtp] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    otp: "",
  });

  // Track mode from URL query
  useEffect(() => {
    const m = searchParams.get("mode") as
      | "login"
      | "register"
      | "verify"
      | null;
    setMode(m ?? "login");
  }, [searchParams?.toString()]);

  // Handle Registration
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setEmailForOtp(form.email);
      router.push("/auth?mode=verify");
    } else {
      alert(data.error || "Registration failed");
    }
  }

  // Handle OTP verification
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailForOtp, otp: form.otp }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Email verified successfully! You can now login.");
      router.push("/auth?mode=login");
    } else {
      alert(data.error || "Verification failed");
    }
  }

  // Handle Login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (!res?.error) router.push("/");
    else alert("Login failed: " + res.error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md bg-card p-6 rounded-2xl shadow-lg flex flex-col gap-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
          <h1 className="text-2xl font-bold">
            {mode === "login" && "Login to Open Treatment"}
            {mode === "register" && "Register for Open Treatment"}
            {mode === "verify" && "Verify Your Email"}
          </h1>
        </div>

        {/* Google Sign-In */}
        {mode === "login" && (
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full bg-white hover:bg-red-600 text-black py-2 rounded-lg transition"
          >
            Sign in with Google
          </button>
        )}

        {/* Forms */}
        {mode === "verify" ? (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              We've sent an OTP to your email. Enter it below to verify your
              account.
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={(e) => setForm({ ...form, otp: e.target.value })}
              className="border px-3 py-2 rounded-md bg-background"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
            >
              Verify OTP
            </button>
          </form>
        ) : (
          <form
            onSubmit={mode === "login" ? handleLogin : handleRegister}
            className="flex flex-col gap-3"
          >
            {mode === "register" && (
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border px-3 py-2 rounded-md bg-background"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border px-3 py-2 rounded-md bg-background"
              required
            />
            {mode === "register" && (
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border px-3 py-2 rounded-md bg-background"
                required
              />
            )}
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border px-3 py-2 rounded-md bg-background"
              required
            />
            {mode === "register" && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className="border px-3 py-2 rounded-md bg-background"
                required
              />
            )}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
            >
              {mode === "login" ? "Login" : "Register"}
            </button>
          </form>
        )}

        {/* Toggle Links */}
        <p className="text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <Link
                href="/auth?mode=register"
                className="text-blue-600 hover:underline"
              >
                Register
              </Link>
            </>
          ) : mode === "register" ? (
            <>
              Already have an account?{" "}
              <Link
                href="/auth?mode=login"
                className="text-blue-600 hover:underline"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              Didn't receive OTP?{" "}
              <button
                onClick={() => router.push("/auth?mode=register")}
                className="text-blue-600 hover:underline"
              >
                Try again
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
