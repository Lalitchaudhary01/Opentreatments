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

        {/* Google Sign-In - Updated Style */}
        {mode === "login" && (
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition border border-gray-300 flex items-center justify-center gap-2 font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
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