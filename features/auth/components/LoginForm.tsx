"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Particles } from "@/components/magicui/particles";
import { useTheme } from "next-themes";
import { Select } from "@/components/ui/select";

export default function AuthForm() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<"login" | "register" | "verify">("login");
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    role: "", // ✅ Add this
  });

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          confirmPassword: form.confirm,
          role: form.role, // ✅ send role
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
    } catch (error) {
      alert("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
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
    } catch (error) {
      alert("An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (res?.error) {
        alert("Login failed: " + res.error);
        return;
      }

      // Get session
      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();

      if (sessionData?.user?.role !== form.role) {
        alert(`You cannot login as ${form.role} with this account.`);
        return;
      }

      // Redirect based on role
      if (form.role === "DOCTOR") router.push("/doctor");
      else router.push("/");
    } catch (error) {
      alert("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      <div className="w-full max-w-xl bg-card p-6 rounded-2xl shadow-lg flex flex-col gap-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <Image src="/logos.png" alt="Logo" width={130} height={130} />
          <h1 className="text-2xl font-bold">
            {mode === "login"
              ? "Login"
              : mode === "register"
              ? "Register"
              : "Verify Email"}
          </h1>
        </div>
        {mode === "register" && (
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="font-bold text-[#10B981] text-2xl whitespace-nowrap">
              Transparency Starts Here
            </h1>
            <p className="text-[#1FB6E8] font-semibold whitespace-nowrap">
              Sign up and know your medical costs upfront
            </p>
          </div>
        )}
        {mode === "verify" && (
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="font-bold text-[#10B981] text-2xl whitespace-nowrap">
              Security First, Transparency Always
            </h1>
            <p className="text-[#1FB6E8] font-semibold whitespace-nowrap">
              We've sent a verification code to your email
            </p>
          </div>
        )}
        {mode === "login" && (
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="font-bold text-[#10B981] text-2xl whitespace-nowrap">
              Good to See You Again
            </h1>
            <p className="text-[#1FB6E8] font-semibold whitespace-nowrap">
              Continue your journey towards stress-free healthcare
            </p>
          </div>
        )}

        {/* Google Button only for login */}
        {mode === "login" && (
          <button
            className="w-full bg-white hover:bg-gray-100 text-gray-700 py-2 rounded-lg transition flex items-center justify-center gap-2 border border-gray-300 h-9"
            onClick={() => {
              setIsLoading(true);
              signIn("google", { callbackUrl: "/" });
            }}
            disabled={isLoading}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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

        {/* Divider */}
        {mode === "login" && (
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-muted-foreground">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        )}

        {/* Forms */}
        {mode === "verify" ? (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-3">
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
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={mode === "login" ? handleLogin : handleRegister}
            className="flex flex-col gap-3"
          >
            {mode === "register" && (
              <>
                {/* Full Name - Full Width */}
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border px-3 py-2 rounded-md bg-background"
                  required
                  disabled={isLoading}
                />

                {/* Email and Phone - Flex Row */}
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="flex-1 border px-3 py-2 rounded-md bg-background"
                    required
                    disabled={isLoading}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="flex-1 border px-3 py-2 rounded-md bg-background"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Password and Confirm Password - Flex Row */}
                <div className="flex gap-3">
                  <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="flex-1 border px-3 py-2 rounded-md bg-background"
                    required
                    disabled={isLoading}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={form.confirm}
                    onChange={(e) =>
                      setForm({ ...form, confirm: e.target.value })
                    }
                    className="flex-1 border px-3 py-2 rounded-md bg-background"
                    required
                    disabled={isLoading}
                  />
                </div>
                {/* Replace the Select component with radio buttons */}
                <div className="flex flex-col gap-2 mt-2">
                  <span className="font-semibold text-sm">Select Role:</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="role"
                        value="USER"
                        checked={form.role === "USER"}
                        onChange={(e) =>
                          setForm({ ...form, role: e.target.value })
                        }
                        disabled={isLoading}
                        required
                      />
                      User
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="role"
                        value="DOCTOR"
                        checked={form.role === "DOCTOR"}
                        onChange={(e) =>
                          setForm({ ...form, role: e.target.value })
                        }
                        disabled={isLoading}
                        required
                      />
                      Doctor
                    </label>
                  </div>
                </div>
              </>
            )}

            {mode === "login" && (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border px-3 py-2 rounded-md bg-background"
                  required
                  disabled={isLoading}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="border px-3 py-2 rounded-md bg-background"
                  required
                  disabled={isLoading}
                />
                <div className="flex flex-col gap-2 mt-2">
                  <span className="font-semibold text-sm">Select Role:</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="role"
                        value="USER"
                        checked={form.role === "USER"}
                        onChange={(e) =>
                          setForm({ ...form, role: e.target.value })
                        }
                        required
                        disabled={isLoading}
                      />
                      User
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="role"
                        value="DOCTOR"
                        checked={form.role === "DOCTOR"}
                        onChange={(e) =>
                          setForm({ ...form, role: e.target.value })
                        }
                        required
                        disabled={isLoading}
                      />
                      Doctor
                    </label>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#10B981] hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
            >
              {isLoading
                ? "Processing..."
                : mode === "login"
                ? "Login"
                : "Register"}
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
