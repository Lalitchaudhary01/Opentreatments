"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Mode = "login" | "register" | "verify";
type Role = "USER" | "DOCTOR" | "PHARMACY";

const ROLE_OPTIONS: Role[] = ["USER", "DOCTOR", "PHARMACY"];

const ROLE_REDIRECT: Record<Role, string> = {
  USER: "/",
  DOCTOR: "/doctor",
  PHARMACY: "/pharmacy/dashboard",
};

function roleLabel(role: Role) {
  return role[0] + role.slice(1).toLowerCase();
}

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<Mode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    role: "" as "" | Role,
  });

  useEffect(() => {
    const nextMode = searchParams.get("mode");
    if (nextMode === "register") setMode("register");
    else if (nextMode === "verify") setMode("verify");
    else setMode("login");
  }, [searchParams]);

  const stepData = useMemo(() => {
    if (mode === "login") {
      return [
        { label: "Sign in", active: true },
        { label: "Access dashboard", active: false },
        { label: "Manage practice", active: false },
      ];
    }

    if (mode === "verify") {
      return [
        { label: "Create account", active: true },
        { label: "Verify email", active: true },
        { label: "Start dashboard", active: false },
      ];
    }

    return [
      { label: "Create account", active: true },
      { label: "Verify email", active: false },
      { label: "Start dashboard", active: false },
    ];
  }, [mode]);

  const updateMode = (nextMode: Exclude<Mode, "verify">) => {
    router.push(`/auth?mode=${nextMode}`);
  };

  const onOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const copy = [...otpDigits];
    copy[index] = digit;
    setOtpDigits(copy);

    if (digit && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
      next?.focus();
    }
  };

  const onOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`) as HTMLInputElement | null;
      prev?.focus();
    }
  };

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!form.role) {
      alert("Please select a role");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          confirmPassword: form.confirm,
          role: form.role,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Registration failed");
        return;
      }

      router.push("/auth?mode=verify");
    } catch {
      alert("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    const otp = otpDigits.join("");
    if (otp.length !== 6) {
      alert("Please enter 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          otp,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Verification failed");
        return;
      }

      alert("Email verified successfully! You can now login.");
      router.push("/auth?mode=login");
    } catch {
      alert("An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!form.role) {
      alert("Please select a role");
      return;
    }

    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (res?.error) {
        alert(`Login failed: ${res.error}`);
        return;
      }

      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();
      const sessionRole = sessionData?.user?.role as Role | undefined;

      if (!sessionRole || sessionRole !== form.role) {
        alert(`You cannot login as ${form.role} with this account.`);
        return;
      }

      router.push(ROLE_REDIRECT[form.role]);
    } catch {
      alert("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#090f1b] text-white">
      <Button onClick={() => router.push("/")} className="absolute left-5 top-5 z-20 bg-white/10 hover:bg-white/20">
        Back to Home
      </Button>

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-8">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-[#090f1b] shadow-2xl lg:grid-cols-[400px_1fr]">
          <aside className="relative hidden bg-gradient-to-br from-[#0c1e3e] via-[#0a1628] to-[#070d1a] p-10 lg:block">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />

            <div className="relative z-10">
              <Image src="/logos.png" alt="OpenTreatment" width={170} height={48} className="mb-10 h-11 w-auto" />

              <div className="space-y-3">
                {stepData.map((step, i) => (
                  <div key={step.label} className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${step.active ? "border-cyan-400/60 bg-cyan-500/15 text-cyan-100" : "border-white/10 bg-white/5 text-slate-300"}`}>
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${step.active ? "bg-cyan-400 text-slate-900" : "bg-white/10 text-slate-300"}`}>
                      {i + 1}
                    </span>
                    {step.label}
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold leading-tight">
                  {mode === "login" ? "Welcome back" : "Your practice, fully digital."}
                </h2>
                <p className="mt-3 text-sm text-slate-300">
                  {mode === "login"
                    ? "Sign in to manage appointments, patients, and revenue from one place."
                    : "Create your account and launch your dashboard in a few quick steps."}
                </p>
              </div>
            </div>
          </aside>

          <main className="flex min-h-[700px] flex-col bg-[#090f1b]">
            <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-12">
              {mode === "verify" ? (
                <section className="mx-auto w-full max-w-xl">
                  <h1 className="text-3xl font-bold">Verify your email</h1>
                  <p className="mt-2 text-sm text-slate-400">
                    Enter the 6-digit code sent to <span className="text-cyan-300">{form.email || "your email"}</span>
                  </p>

                  <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6">
                    <div className="flex justify-center gap-2 sm:gap-3">
                      {otpDigits.map((d, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          value={d}
                          onChange={(e) => onOtpChange(i, e.target.value)}
                          onKeyDown={(e) => onOtpKeyDown(i, e)}
                          inputMode="numeric"
                          maxLength={1}
                          className="h-12 w-11 rounded-xl border border-white/15 bg-white/5 text-center text-lg font-bold outline-none focus:border-cyan-400"
                        />
                      ))}
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                    >
                      {isLoading ? "Verifying..." : "Verify OTP"}
                    </Button>

                    <button type="button" onClick={() => updateMode("login")} className="w-full text-sm text-slate-400 hover:text-slate-200">
                      Back to sign in
                    </button>
                  </form>
                </section>
              ) : mode === "register" ? (
                <section className="mx-auto w-full max-w-xl">
                  <h1 className="text-3xl font-bold">Create your account</h1>
                  <p className="mt-2 text-sm text-slate-400">Get started free. No credit card required.</p>

                  <form onSubmit={handleRegister} className="mt-7 space-y-4">
                    <button
                      type="button"
                      onClick={() => signIn("google", { callbackUrl: "/" })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-200 hover:bg-white/10"
                    >
                      Continue with Google
                    </button>

                    <div className="flex items-center gap-3 py-1 text-xs text-slate-500">
                      <span className="h-px flex-1 bg-white/10" />
                      or create with email
                      <span className="h-px flex-1 bg-white/10" />
                    </div>

                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={form.phone}
                      onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        value={form.password}
                        onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                      />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={form.confirm}
                        onChange={(e) => setForm((prev) => ({ ...prev, confirm: e.target.value }))}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-medium text-slate-300">Select role</p>
                      <div className="grid grid-cols-3 gap-2">
                        {ROLE_OPTIONS.map((role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => setForm((prev) => ({ ...prev, role }))}
                            className={`rounded-lg border px-3 py-2 text-sm transition ${
                              form.role === role
                                ? "border-cyan-400 bg-cyan-500/20 text-cyan-100"
                                : "border-white/15 bg-white/5 text-slate-300 hover:border-white/25"
                            }`}
                          >
                            {roleLabel(role)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="mt-2 w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>

                    <p className="pt-2 text-center text-sm text-slate-400">
                      Already have an account?{" "}
                      <button type="button" onClick={() => updateMode("login")} className="text-cyan-300 hover:underline">
                        Sign in
                      </button>
                    </p>
                  </form>
                </section>
              ) : (
                <section className="mx-auto w-full max-w-xl">
                  <h1 className="text-3xl font-bold">Sign in</h1>
                  <p className="mt-2 text-sm text-slate-400">Continue to your OpenTreatment dashboard.</p>

                  <form onSubmit={handleLogin} className="mt-7 space-y-4">
                    <button
                      type="button"
                      onClick={() => signIn("google", { callbackUrl: "/" })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-200 hover:bg-white/10"
                    >
                      Continue with Google
                    </button>

                    <div className="flex items-center gap-3 py-1 text-xs text-slate-500">
                      <span className="h-px flex-1 bg-white/10" />
                      or sign in with email
                      <span className="h-px flex-1 bg-white/10" />
                    </div>

                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={form.password}
                      onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                    />

                    <div>
                      <p className="mb-2 text-sm font-medium text-slate-300">Select role</p>
                      <div className="grid grid-cols-3 gap-2">
                        {ROLE_OPTIONS.map((role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => setForm((prev) => ({ ...prev, role }))}
                            className={`rounded-lg border px-3 py-2 text-sm transition ${
                              form.role === role
                                ? "border-cyan-400 bg-cyan-500/20 text-cyan-100"
                                : "border-white/15 bg-white/5 text-slate-300 hover:border-white/25"
                            }`}
                          >
                            {roleLabel(role)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-right">
                      <button type="button" className="text-xs text-slate-400 hover:text-slate-200">
                        Forgot password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>

                    <p className="pt-2 text-center text-sm text-slate-400">
                      New here?{" "}
                      <button type="button" onClick={() => updateMode("register")} className="text-cyan-300 hover:underline">
                        Create account
                      </button>
                    </p>
                  </form>
                </section>
              )}
            </div>

            <footer className="border-t border-white/10 px-6 py-4 text-xs text-slate-500 sm:px-12">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-4">
                  <span>Privacy Policy</span>
                  <span>Terms of Service</span>
                  <span>Help</span>
                </div>
                <span>© 2026 OpenTreatment</span>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
