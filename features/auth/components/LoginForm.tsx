"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import type {
  AuthMode,
  DoctorOnboardingFormState,
} from "../doctor/DoctorOnboardingSteps";
import { completeDoctorOnboarding } from "../doctor/actions/doctorOnboardingActions";
import Image from "next/image";

const DoctorOnboardingSteps = dynamic(
  () => import("../doctor/DoctorOnboardingSteps").then((mod) => mod.DoctorOnboardingSteps),
  { ssr: false, loading: () => null }
);

type Role = "USER" | "DOCTOR" | "PHARMACY" | "ADMIN";

const REGISTER_ROLES: Role[] = ["USER", "DOCTOR", "PHARMACY"];
const LOGIN_ROLES: Role[] = ["USER", "DOCTOR", "PHARMACY", "ADMIN"];

const REDIRECT_BY_ROLE: Record<Role, string> = {
  USER: "/",
  DOCTOR: "/doctor",
  PHARMACY: "/pharmacy/dashboard",
  ADMIN: "/admin/dashbaord",
};

const VERIFY_REDIRECT_BY_ROLE: Record<Role, string> = {
  USER: "/",
  DOCTOR: "/doctor/profile/submit",
  PHARMACY: "/pharmacy/profile/submit",
  ADMIN: "/admin/dashbaord",
};

function isRole(value: string | null): value is Role {
  return !!value && LOGIN_ROLES.includes(value as Role);
}

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showForgot, setShowForgot] = useState(false);
  const [resendIn, setResendIn] = useState(30);
  const [pwScore, setPwScore] = useState(0);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as "" | Role,
  });
  const [doctorForm, setDoctorForm] = useState<DoctorOnboardingFormState>({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    medicalRegistrationNumber: "",
    qualification: "MBBS",
    graduationYear: "",
    experienceLabel: "Less than 1 year",
    languages: "",
    clinicName: "",
    city: "",
    pinCode: "",
    address: "",
    specialization: "General Physician",
  });

  useEffect(() => {
    const m = searchParams.get("mode");
    if (m === "register") setMode("register");
    else if (m === "verify") setMode("verify");
    else if (m === "doctor-details") setMode("doctor-details");
    else if (m === "doctor-clinic") setMode("doctor-clinic");
    else if (m === "doctor-success") setMode("doctor-success");
    else setMode("login");

    const roleParam = searchParams.get("role");
    if (isRole(roleParam)) {
      setForm((prev) => ({ ...prev, role: roleParam }));
    }

    const emailParam = searchParams.get("email");
    if (emailParam) {
      setForm((prev) => ({ ...prev, email: emailParam }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (mode !== "verify") return;
    setResendIn(30);
    const id = window.setInterval(() => {
      setResendIn((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [mode]);

  const progress = useMemo(() => {
    if (mode === "register") return 25;
    if (mode === "verify") return 50;
    if (mode === "doctor-details") return 70;
    if (mode === "doctor-clinic") return 90;
    if (mode === "doctor-success") return 100;
    return 75;
  }, [mode]);

  const pwMeta = useMemo(() => {
    if (!form.password) return { width: 0, label: "Enter a password", color: "#475569" };
    if (pwScore <= 1) return { width: 30, label: "Weak password", color: "#ef4444" };
    if (pwScore <= 3) return { width: 65, label: "Good password", color: "#f59e0b" };
    return { width: 100, label: "Strong password", color: "#22c55e" };
  }, [form.password, pwScore]);

  const leftTagline = useMemo(() => {
    if (mode === "register") return "Your practice,<br/><em>fully digital.</em>";
    if (mode === "verify") return "One step to<br/><em>secure your account.</em>";
    if (mode === "doctor-details") return "Build your profile,<br/><em>earn patient trust.</em>";
    if (mode === "doctor-clinic") return "Clinic details,<br/><em>almost done.</em>";
    if (mode === "doctor-success") return "You're all set,<br/><em>Doctor.</em>";
    return "Welcome back,<br/><em>Doctor.</em>";
  }, [mode]);

  const leftSub = useMemo(() => {
    if (mode === "register") return "Join 12,000+ doctors managing appointments, patients & revenue on OpenTreatment.";
    if (mode === "verify") return "Email verification keeps your patient data and clinic profile protected.";
    if (mode === "doctor-details") return "Tell us about your professional details so your profile is verification-ready.";
    if (mode === "doctor-clinic") return "Add clinic and specialisation details to complete your doctor onboarding.";
    if (mode === "doctor-success") return "Your profile is submitted and will be reviewed by admin shortly.";
    return "Sign in to manage your appointments, patients and revenue.";
  }, [mode]);

  const goMode = (m: AuthMode) => {
    setShowForgot(false);
    router.push(`/auth?mode=${m}`);
  };

  const onGoogleAuth = async () => {
    if (!form.role) {
      alert("Please select role first");
      return;
    }
    await signIn("google", {
      callbackUrl: `/auth/google?role=${form.role}`,
    });
  };

  const updatePassword = (value: string) => {
    const rules = [
      value.length >= 8,
      /[A-Z]/.test(value),
      /[a-z]/.test(value),
      /\d/.test(value),
      /[^A-Za-z0-9]/.test(value),
    ];
    setPwScore(rules.filter(Boolean).length);
    setForm((p) => ({ ...p, password: value }));
  };

  const onOtpChange = (idx: number, val: string) => {
    const d = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[idx] = d;
    setOtp(next);
    if (d && idx < 5) {
      const el = document.getElementById(`otp-${idx + 1}`) as HTMLInputElement | null;
      el?.focus();
    }
  };

  const onOtpKey = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      const el = document.getElementById(`otp-${idx - 1}`) as HTMLInputElement | null;
      el?.focus();
    }
  };

  async function registerSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.role) return alert("Please select role");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
          role: form.role,
        }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error || "Registration failed");
      router.push(
        `/auth?mode=verify&role=${form.role}&email=${encodeURIComponent(form.email)}`
      );
    } catch {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  async function verifySubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return alert("Please enter 6-digit OTP");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp: code }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Verification failed");

      const apiRole = typeof data.role === "string" ? data.role : null;
      const verifiedRole: Role | null = isRole(apiRole)
        ? apiRole
        : isRole(form.role)
          ? form.role
          : null;
      if (!verifiedRole) {
        alert("Email verified. Please login.");
        return goMode("login");
      }

      const signInRes = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (signInRes?.error) {
        alert("Email verified. Please login to continue.");
        return router.push(`/auth?mode=login&role=${verifiedRole}&email=${encodeURIComponent(form.email)}`);
      }

      if (verifiedRole === "DOCTOR") {
        return router.push(
          `/auth?mode=doctor-details&role=DOCTOR&email=${encodeURIComponent(form.email)}`
        );
      }

      const nextPath =
        typeof data.nextPath === "string"
          ? data.nextPath
          : VERIFY_REDIRECT_BY_ROLE[verifiedRole];
      router.push(nextPath);
    } catch {
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  }

  async function loginSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.role) return alert("Please select role");

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });
      if (res?.error) return alert(`Login failed: ${res.error}`);

      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();
      const sessionRole = sessionData?.user?.role as Role | undefined;

      if (!sessionRole || sessionRole !== form.role) {
        return alert(`You cannot login as ${form.role} with this account.`);
      }

      router.push(REDIRECT_BY_ROLE[form.role]);
    } catch {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  }

  function continueDoctorDetails() {
    if (!doctorForm.firstName.trim() || !doctorForm.lastName.trim()) {
      alert("First name and last name are required");
      return;
    }
    if (!doctorForm.phone.trim()) {
      alert("Phone number is required");
      return;
    }
    if (!doctorForm.medicalRegistrationNumber.trim()) {
      alert("Medical registration number is required");
      return;
    }
    if (!doctorForm.qualification.trim()) {
      alert("Qualification is required");
      return;
    }
    router.push(
      `/auth?mode=doctor-clinic&role=DOCTOR&email=${encodeURIComponent(form.email)}`
    );
  }

  async function submitDoctorOnboarding() {
    if (!doctorForm.clinicName.trim() || !doctorForm.city.trim()) {
      alert("Clinic name and city are required");
      return;
    }
    if (!doctorForm.specialization.trim()) {
      alert("Specialization is required");
      return;
    }

    setLoading(true);
    try {
      const result = await completeDoctorOnboarding(doctorForm);
      if (!result.ok) return alert(result.error || "Unable to submit profile");
      router.push("/auth?mode=doctor-success");
    } catch {
      alert("Unable to submit profile");
    } finally {
      setLoading(false);
    }
  }

  function handleFooterContinue() {
    if (mode === "register") {
      void registerSubmit({ preventDefault() {} } as React.FormEvent);
      return;
    }
    if (mode === "verify") {
      void verifySubmit({ preventDefault() {} } as React.FormEvent);
      return;
    }
    if (mode === "doctor-details") {
      continueDoctorDetails();
      return;
    }
    if (mode === "doctor-clinic") {
      void submitDoctorOnboarding();
    }
  }

  return (
    <>
      <div id="ob-overlay">
        <div className={`ob-left ${mode === "login" ? "signin-mode" : ""}`}>
          <div className="ob-left-dots" />
          <div className="ob-left-glow" />
          <div className="ob-left-glow2" />

          <div className="ob-brand">
            
            <div className="flex items-center gap-3">
                          <Image
                            src="/Subtract.svg"
                            alt="Open Treatment"
                            width={51}
                            height={72}
                            className="w-10 h-auto sm:w-12 lg:w-[51px]"
                          />
                          <span className="text-xl sm:text-2xl font-bold text-[#ECF5FF]">
                            Open Treatment
                          </span>
                        </div>
          </div>

          <svg viewBox="0 0 340 300" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-55%)", width: 340, opacity: .18 }} fill="none">
            <rect x="60" y="40" width="220" height="180" rx="18" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 4"/>
            <rect x="80" y="60" width="80" height="100" rx="10" fill="rgba(59,130,246,.12)" stroke="#3b82f6" strokeWidth="1.2"/>
            <circle cx="120" cy="95" r="22" stroke="#14b8a6" strokeWidth="1.5"/>
            <line x1="120" y1="73" x2="120" y2="117" stroke="#14b8a6" strokeWidth="1.5"/>
            <line x1="98" y1="95" x2="142" y2="95" stroke="#14b8a6" strokeWidth="1.5"/>
          </svg>

          <div className="ob-left-content">
            <div className="ob-steps-side" id="ob-steps-side">
              <div className={`ob-sp ${mode === "register" ? "active" : "done"}`}><div className="ob-sp-num">{mode === "register" ? "1" : "✓"}</div><div className="ob-sp-label">Create account</div></div>
              <div className={`ob-sp ${mode === "verify" ? "active" : ["doctor-details", "doctor-clinic", "doctor-success", "login"].includes(mode) ? "done" : "dim"}`}><div className="ob-sp-num">{mode === "verify" ? "2" : "✓"}</div><div className="ob-sp-label">Verify email</div></div>
              <div className={`ob-sp ${mode === "doctor-details" ? "active" : ["doctor-clinic", "doctor-success"].includes(mode) ? "done" : "dim"}`}><div className="ob-sp-num">{mode === "doctor-details" ? "3" : ["doctor-clinic", "doctor-success"].includes(mode) ? "✓" : "3"}</div><div className="ob-sp-label">Personal &amp; credentials</div></div>
              <div className={`ob-sp ${mode === "doctor-clinic" ? "active" : mode === "doctor-success" ? "done" : "dim"}`}><div className="ob-sp-num">{mode === "doctor-success" ? "✓" : "4"}</div><div className="ob-sp-label">Clinic &amp; specialisation</div></div>
            </div>
            <div className="ob-tagline" dangerouslySetInnerHTML={{ __html: leftTagline }} />
            <div className="ob-tagsub">{leftSub}</div>
          </div>
        </div>

        <div className="ob-right">
          <div className="ob-progress-bar"><div className="ob-progress-fill" style={{ width: `${progress}%` }} /></div>

          <div className="ob-right-inner">
            {mode === "register" && (
              <div className="ob-step active" id="ob-s0">
                <div className="ob-step-title">Create your account</div>
                <div className="ob-step-sub">Get started free - no credit card required</div>

                <button className="ob-social" type="button" onClick={onGoogleAuth}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continue with Google
                </button>
                <button className="ob-social" type="button">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M19.665 16.395c-.287.66-.42.955-.79 1.536-.517.81-1.246 1.818-2.154 1.825-.807.008-1.015-.525-2.111-.52-1.095.006-1.322.53-2.13.522-.907-.009-1.597-.918-2.114-1.727-1.447-2.27-1.599-4.93-.705-6.304.635-.976 1.637-1.549 2.58-1.549.96 0 1.564.53 2.355.53.768 0 1.236-.53 2.347-.53.84 0 1.729.457 2.361 1.244-2.077 1.14-1.74 4.102.36 4.973zm-3.715-8.59c.42-.54.739-1.303.624-2.055-.685.047-1.487.487-1.95 1.052-.42.513-.769 1.274-.632 2.002.748.022 1.522-.425 1.958-.999z" />
                  </svg>
                  Continue with Apple
                </button>
                <div className="ob-divider">or sign up with email</div>

                <form onSubmit={registerSubmit}>
                  <div className="ob-ff">
                    <label>Select role</label>
                    <select value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value as Role }))} required>
                      <option value="">Choose role</option>
                      {REGISTER_ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="ob-ff"><label>Email address</label><input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="you@clinic.com" required /></div>
                  <div className="ob-ff">
                    <label>Password</label>
                    <input type="password" value={form.password} onChange={(e) => updatePassword(e.target.value)} placeholder="Create a strong password" required />
                    <div className="pw-bar-wrap"><div className="pw-bar" style={{ width: `${pwMeta.width}%`, background: pwMeta.color }} /></div>
                    <div className="pw-lbl" style={{ color: pwMeta.color }}>{pwMeta.label}</div>
                  </div>
                  <div className="ob-ff"><label>Confirm password</label><input type="password" value={form.confirmPassword} onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))} placeholder="Re-enter password" required /></div>

                  <div className="ob-footer-cta">
                    <button className="ob-btn ob-btn-primary" type="submit" disabled={loading}> {loading ? "Please wait..." : "Continue"}</button>
                  </div>
                </form>

                <div className="ob-trust">
                  <div className="ob-trust-item">256-bit SSL</div>
                  <div className="ob-trust-item">HIPAA aligned</div>
                  <div className="ob-trust-item">No spam, ever</div>
                </div>
                <div className="ob-link-row">Already have an account? <a onClick={() => goMode("login")}>Sign in -&gt;</a></div>
              </div>
            )}

            {mode === "verify" && (
              <div className="ob-step active" id="ob-s1">
                <div className="ob-step-title">Verify your email</div>
                <div className="ob-step-sub">We sent a 6-digit code to your email address. Enter it below to continue.</div>

                <div className="ob-email-preview"><span>{form.email || "you@clinic.com"}</span></div>

                <form onSubmit={verifySubmit}>
                  <div className="otp-wrap" id="otp-wrap">
                    {otp.map((d, i) => (
                      <input key={i} id={`otp-${i}`} className="otp-box" maxLength={1} inputMode="numeric" value={d} onChange={(e) => onOtpChange(i, e.target.value)} onKeyDown={(e) => onOtpKey(i, e)} />
                    ))}
                  </div>

                  <button className="ob-btn ob-btn-primary" type="submit" disabled={loading}>{loading ? "Verifying..." : "Verify & Continue"}</button>
                </form>

                <div className="ob-resend-row">
                  {resendIn > 0 ? (
                    <span>Resend code in <strong>{resendIn}s</strong></span>
                  ) : (
                    <button type="button" onClick={() => setResendIn(30)}>Resend code</button>
                  )}
                </div>
                <div className="ob-resend-row">Demo mode: use code <strong>123456</strong> <button type="button" onClick={() => setOtp(["1", "2", "3", "4", "5", "6"])}>Auto-fill</button></div>
              </div>
            )}

            <DoctorOnboardingSteps
              mode={mode}
              doctorForm={doctorForm}
              setDoctorForm={setDoctorForm}
              onSetupDashboard={() => router.push("/doctor/approvals")}
            />

            {mode === "login" && (
              <div id="ob-signin-panel" className="show">
                <div className="ob-si-inner ob-login-view">
                  {!showForgot ? (
                    <>
                  <div className="ob-step-title">Welcome back</div>
                  <div className="ob-step-sub">Sign in to your OpenTreatment account</div>

                  <button className="ob-social" type="button" onClick={onGoogleAuth}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Continue with Google
                  </button>
                  <button className="ob-social" type="button">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path d="M19.665 16.395c-.287.66-.42.955-.79 1.536-.517.81-1.246 1.818-2.154 1.825-.807.008-1.015-.525-2.111-.52-1.095.006-1.322.53-2.13.522-.907-.009-1.597-.918-2.114-1.727-1.447-2.27-1.599-4.93-.705-6.304.635-.976 1.637-1.549 2.58-1.549.96 0 1.564.53 2.355.53.768 0 1.236-.53 2.347-.53.84 0 1.729.457 2.361 1.244-2.077 1.14-1.74 4.102.36 4.973zm-3.715-8.59c.42-.54.739-1.303.624-2.055-.685.047-1.487.487-1.95 1.052-.42.513-.769 1.274-.632 2.002.748.022 1.522-.425 1.958-.999z" />
                    </svg>
                    Continue with Apple
                  </button>
                  <div className="ob-divider">or sign in with email</div>

                  <form onSubmit={loginSubmit}>
                    <div className="ob-ff">
                      <label>Select role</label>
                      <select value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value as Role }))} required>
                        <option value="">Choose role</option>
                        {LOGIN_ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="ob-ff"><label>Email address</label><input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="you@clinic.com" required /></div>
                    <div className="ob-ff">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                        <label>Password</label>
                        <a style={{ fontSize: 11.5, color: "#3b82f6", cursor: "pointer", fontWeight: 500 }} onClick={() => setShowForgot(true)}>Forgot password?</a>
                      </div>
                      <input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder="Your password" required />
                    </div>

                    <button className="ob-btn ob-btn-primary" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
                  </form>

                  <div className="ob-link-row" style={{ marginTop: 22 }}>New to OpenTreatment? <a onClick={() => goMode("register")}>Create account -&gt;</a></div>
                    </>
                  ) : (
                    <>
                      <button type="button" className="ob-back-link" onClick={() => setShowForgot(false)}>Back to sign in</button>
                      <div className="ob-step-title" style={{ fontSize: 22 }}>Reset your password</div>
                      <div className="ob-step-sub">Enter your account email and we will send a reset link.</div>
                      <div className="ob-ff"><label>Email address</label><input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="you@clinic.com" /></div>
                      <button type="button" className="ob-btn ob-btn-primary" onClick={() => alert("Reset link feature will be added next.")}>Send reset link</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {mode !== "login" && mode !== "doctor-success" ? (
            <div className="ob-footer">
              <div className="ob-dots">
                <div className={`ob-dot ${mode === "register" ? "active" : "done"}`} />
                <div className={`ob-dot ${mode === "verify" ? "active" : ["doctor-details", "doctor-clinic"].includes(mode) ? "done" : ""}`} />
                <div className={`ob-dot ${mode === "doctor-details" ? "active" : mode === "doctor-clinic" ? "done" : ""}`} />
                <div className={`ob-dot ${mode === "doctor-clinic" ? "active" : ""}`} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  className="ob-btn ob-btn-ghost"
                  onClick={() => {
                    if (mode === "verify") return goMode("register");
                    if (mode === "doctor-details") return goMode("verify");
                    if (mode === "doctor-clinic") return goMode("doctor-details");
                    goMode("register");
                  }}
                >
                  Back
                </button>
                <button className="ob-btn ob-btn-primary" disabled={loading} onClick={handleFooterContinue}>
                  {mode === "doctor-clinic" ? "Setup Dashboard" : "Continue"}
                </button>
              </div>
            </div>
          ) : mode === "login" ? (
            <div className="ob-si-footer">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 18 }}><span>Privacy Policy</span><span>Terms of Service</span><span>Help</span></div>
                <div>© 2026 OpenTreatment</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <style jsx global>{`
        #ob-overlay{position:fixed;inset:0;z-index:3000;display:flex;background:#090f1b;transition:opacity .6s ease;font-family:'Sora',sans-serif}
        .ob-left{width:400px;flex-shrink:0;background:linear-gradient(158deg,#0c1e3e 0%,#0a1628 60%,#070d1a 100%);position:relative;display:flex;flex-direction:column;justify-content:flex-end;padding:48px;overflow:hidden}
        .ob-left-dots{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.028) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
        .ob-left-glow{position:absolute;top:-100px;left:-100px;width:480px;height:480px;border-radius:50%;background:radial-gradient(circle,rgba(59,130,246,.16) 0%,transparent 65%);animation:ob-glow 4s ease-in-out infinite}
        .ob-left-glow2{position:absolute;bottom:-60px;right:-60px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,.1) 0%,transparent 65%);animation:ob-glow 5s ease-in-out infinite reverse}
        @keyframes ob-glow{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
        .ob-brand{position:absolute;top:38px;left:48px;display:flex;align-items:center;gap:11px}
        .ob-brand-icon{width:34px;height:34px;background:linear-gradient(135deg,#3b82f6,#14b8a6);border-radius:9px;display:flex;align-items:center;justify-content:center}
        .ob-brand-icon svg{width:18px;height:18px;fill:white}
        .ob-brand-name{font-size:16px;font-weight:700;color:#fff;letter-spacing:-.02em}.ob-brand-name span{color:#3b82f6}
        .ob-left-content{position:relative;z-index:1}
        .ob-steps-side{display:flex;flex-direction:column;gap:10px;margin-bottom:40px}
        .ob-sp{display:flex;align-items:center;gap:12px;opacity:.38}.ob-sp.dim{opacity:.38}.ob-sp.done{opacity:.65}.ob-sp.active{opacity:1}
        .ob-sp-num{width:26px;height:26px;border-radius:50%;border:1.5px solid rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;color:rgba(255,255,255,.4)}
        .ob-sp.active .ob-sp-num{background:#3b82f6;border-color:#3b82f6;color:#fff}.ob-sp.done .ob-sp-num{background:#14b8a6;border-color:#14b8a6;color:#fff}
        .ob-sp-label{font-size:12px;font-weight:500;color:rgba(255,255,255,.5)}.ob-sp.active .ob-sp-label{color:#fff;font-weight:600}
        .ob-left.signin-mode .ob-steps-side{opacity:0;pointer-events:none;transform:translateY(8px);transition:all .4s}
        .ob-tagline{font-size:21px;font-weight:700;color:#fff;line-height:1.35;letter-spacing:-.025em}.ob-tagline em{color:#3b82f6;font-style:normal}
        .ob-tagsub{font-size:12.5px;color:rgba(255,255,255,.42);margin-top:8px;line-height:1.65}
        .ob-right{flex:1;display:flex;flex-direction:column;overflow:hidden;background:#090f1b}
        .ob-progress-bar{height:2px;background:rgba(255,255,255,.05)}.ob-progress-fill{height:100%;background:linear-gradient(90deg,#3b82f6,#14b8a6);transition:width .5s}
        .ob-right-inner{flex:1;overflow:hidden;position:relative}
        .ob-step{position:relative;padding:52px 56px;opacity:1;transform:none;pointer-events:auto;overflow-y:auto;height:100%}
        .ob-step-title{font-size:24px;font-weight:700;color:#f1f5f9;letter-spacing:-.025em;margin-bottom:5px}
        .ob-step-sub{font-size:13px;color:#64748b;margin-bottom:32px;line-height:1.55}
        .ob-row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .ob-row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
        .ob-social{display:flex;align-items:center;gap:12px;width:100%;padding:11px 16px;border:1.5px solid rgba(255,255,255,.09);border-radius:9px;background:rgba(255,255,255,.025);color:#e2e8f0;font-family:Sora,sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;margin-bottom:10px}
        .ob-social:hover{border-color:rgba(255,255,255,.18);background:rgba(255,255,255,.05);transform:translateY(-1px)}
        .ob-divider{display:flex;align-items:center;gap:10px;margin:16px 0;color:#334155;font-size:11px}.ob-divider::before,.ob-divider::after{content:"";flex:1;height:1px;background:rgba(255,255,255,.06)}
        .ob-role-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px}
        .ob-role-card{padding:14px 16px;border-radius:10px;border:1.5px solid rgba(255,255,255,.08);background:rgba(255,255,255,.025);cursor:pointer;transition:all .22s;text-align:left}
        .ob-role-card:hover{border-color:rgba(59,130,246,.35);background:rgba(59,130,246,.05)}.ob-role-card.sel{border-color:#3b82f6;background:rgba(59,130,246,.1);box-shadow:0 0 0 3px rgba(59,130,246,.08)}
        .ob-role-icon{font-size:20px;margin-bottom:6px}.ob-role-label{font-size:12.5px;font-weight:600;color:#e2e8f0}.ob-role-card.sel .ob-role-label{color:#60a5fa}.ob-role-sub{font-size:10.5px;color:#475569;margin-top:2px;line-height:1.4}
        .ob-ff{display:flex;flex-direction:column;gap:5px;margin-bottom:14px}.ob-ff label{font-size:10.5px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.07em}
        .ob-ff input,.ob-ff select{background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.08);border-radius:9px;padding:10px 13px;color:#e2e8f0;font-family:Sora,sans-serif;font-size:13px;outline:none;transition:all .2s;width:100%}
        .ob-ff input:focus,.ob-ff select:focus{border-color:#3b82f6;background:rgba(59,130,246,.05)}
        .ob-ff select option{background:#111827;color:#e2e8f0}
        .spec-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:4px}
        .sc-chip{padding:12px 8px;border-radius:9px;border:1.5px solid rgba(255,255,255,.07);background:rgba(255,255,255,.025);cursor:pointer;transition:all .22s;text-align:center}
        .sc-chip:hover{border-color:rgba(59,130,246,.35);background:rgba(59,130,246,.06)}
        .sc-chip.sel{border-color:#3b82f6;background:rgba(59,130,246,.11);box-shadow:0 0 0 3px rgba(59,130,246,.08)}
        .sc-chip-lbl{font-size:10.5px;font-weight:600;color:#94a3b8;line-height:1.2}
        .sc-chip.sel .sc-chip-lbl{color:#60a5fa}
        .pw-bar-wrap{height:3px;border-radius:2px;background:rgba(255,255,255,.06);margin-top:7px;overflow:hidden}
        .pw-bar{height:100%;border-radius:2px;transition:width .4s ease,background .4s ease;width:0}
        .pw-lbl{font-size:10.5px;margin-top:5px;color:#475569;transition:color .3s}
        .otp-wrap{display:flex;gap:10px;justify-content:center;margin:28px 0 20px}
        .otp-box{width:52px;height:60px;border-radius:12px;border:1.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#e2e8f0;font-family:Sora,sans-serif;font-size:24px;font-weight:700;text-align:center;outline:none;transition:all .2s}
        .otp-box:focus{border-color:#3b82f6;background:rgba(59,130,246,.07);box-shadow:0 0 0 3px rgba(59,130,246,.12)}
        .ob-email-preview{display:inline-flex;align-items:center;gap:8px;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.18);border-radius:8px;padding:7px 14px;font-size:12.5px;color:#93c5fd;margin-bottom:8px}
        .ob-resend-row{font-size:12px;color:#475569;margin-top:14px;text-align:center}.ob-resend-row strong{color:#fff}.ob-resend-row button{background:none;border:1px solid rgba(245,158,11,.25);border-radius:6px;color:#fbbf24;padding:2px 10px;cursor:pointer}
        .ob-trust{display:flex;gap:18px;justify-content:center;margin-top:28px;flex-wrap:wrap}
        .ob-trust-item{display:flex;align-items:center;gap:5px;font-size:10.5px;color:rgba(255,255,255,.28)}
        .ob-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 22px;border-radius:9px;font-family:Sora,sans-serif;font-size:13px;font-weight:600;cursor:pointer;border:none;transition:all .2s;letter-spacing:-.01em}
        .ob-btn-primary{background:#3b82f6;color:#fff}.ob-btn-primary:hover{background:#2563eb;transform:translateY(-1px)}
        .ob-btn-ghost{background:transparent;color:#64748b;border:1.5px solid rgba(255,255,255,.09)}.ob-btn-ghost:hover{border-color:rgba(255,255,255,.18);color:#94a3b8}
        .ob-btn-launch{background:linear-gradient(135deg,#14b8a6,#0d9488);color:#fff;padding:13px 32px;font-size:14px}
        .ob-btn-launch:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(20,184,166,.4)}
        .ob-link-row{text-align:center;margin-top:18px;font-size:12px;color:#475569}.ob-link-row a{color:#3b82f6;cursor:pointer;font-weight:600;text-decoration:none}
        .ob-back-link{background:none;border:none;cursor:pointer;color:#475569;font-family:Sora,sans-serif;font-size:13px;display:flex;align-items:center;gap:6px;padding:0;margin-bottom:20px;transition:color .2s}
        .ob-back-link:hover{color:#94a3b8}
        .ob-footer{padding:22px 56px;border-top:1px solid rgba(255,255,255,.05);display:flex;align-items:center;justify-content:space-between;flex-shrink:0;background:#090f1b}
        .ob-dots{display:flex;gap:5px}.ob-dot{width:6px;height:6px;border-radius:3px;background:rgba(255,255,255,.12)}.ob-dot.active{width:22px;background:#3b82f6}.ob-dot.done{background:rgba(20,184,166,.55)}
        #ob-signin-panel{position:absolute;inset:0;background:#090f1b;display:flex;flex-direction:column;z-index:10}.ob-si-inner{flex:1;overflow-y:auto;padding:52px 56px}
        .ob-si-footer{padding:22px 56px;border-top:1px solid rgba(255,255,255,.05);background:#090f1b;flex-shrink:0;font-size:11px;color:#334155}
        .ob-footer-cta{display:none}
        @media (max-width: 1024px){
          .ob-left{display:none}
          .ob-step,.ob-si-inner{padding:28px 22px}
          .ob-footer,.ob-si-footer{padding:14px 22px}
          .ob-role-grid{grid-template-columns:1fr}
          .ob-row2{grid-template-columns:1fr}
          .ob-row3{grid-template-columns:1fr}
          .spec-grid{grid-template-columns:1fr 1fr}
          .ob-footer{display:none}
          .ob-footer-cta{display:block}
          .ob-btn{width:100%;justify-content:center}
        }
      `}</style>
    </>
  );
}
