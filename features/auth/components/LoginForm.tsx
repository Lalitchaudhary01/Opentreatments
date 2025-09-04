"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<"login" | "register" | "verify">("login");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const m = searchParams.get("mode");
    if (m === "register") setMode("register");
    else if (m === "verify") setMode("verify");
    else setMode("login");
  }, [searchParams]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    otp: "",
  });

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        confirmPassword: form.confirm,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      setUserId(data.userId);
      router.push("/auth?mode=verify");
    } else {
      alert(data.error || "Registration failed");
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({
        email: form.email,
        otp: form.otp,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      alert("Email verified successfully! You can now login.");
      router.push("/auth?mode=login");
    } else {
      alert(data.error || "Verification failed");
    }
  }

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

        {/* Google Button only for login */}
        {mode === "login" && (
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
          >
            Sign in with Google
          </button>
        )}

        {/* Forms */}
        {mode === "verify" ? (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              We've sent an OTP to your email. Please enter it below to verify
              your account.
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={(e) => setForm({ ...form, otp: e.target.value })}
              className="border px-3 py-2 rounded-md bg-background"
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
              <a
                href="/auth?mode=register"
                className="text-blue-600 hover:underline"
              >
                Register
              </a>
            </>
          ) : mode === "register" ? (
            <>
              Already have an account?{" "}
              <a
                href="/auth?mode=login"
                className="text-blue-600 hover:underline"
              >
                Login
              </a>
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
