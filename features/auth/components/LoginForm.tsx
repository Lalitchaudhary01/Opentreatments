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
import type { PharmacyOnboardingFormState } from "../pharmacy/PharmacyOnboardingSteps";
import { completePharmacyOnboarding } from "../pharmacy/actions/pharmacyOnboardingActions";
import type { HospitalOnboardingFormState } from "../hospital/HospitalOnboardingSteps";
import { completeHospitalOnboarding } from "../hospital/actions/hospitalOnboardingActions";
import AuthLeftPanel from "./auth-form/AuthLeftPanel";
import AuthRegisterStep from "./auth-form/AuthRegisterStep";
import AuthVerifyStep from "./auth-form/AuthVerifyStep";
import AuthLoginStep from "./auth-form/AuthLoginStep";
import type { AuthFormState, Role } from "./auth-form/types";

const DoctorOnboardingSteps = dynamic(
  () => import("../doctor/DoctorOnboardingSteps").then((mod) => mod.DoctorOnboardingSteps),
  { ssr: false, loading: () => null }
);
const PharmacyOnboardingSteps = dynamic(
  () => import("../pharmacy/PharmacyOnboardingSteps").then((mod) => mod.PharmacyOnboardingSteps),
  { ssr: false, loading: () => null }
);
const HospitalOnboardingSteps = dynamic(
  () => import("../hospital/HospitalOnboardingSteps").then((mod) => mod.HospitalOnboardingSteps),
  { ssr: false, loading: () => null }
);

const REGISTER_ROLES: Role[] = ["USER", "DOCTOR", "PHARMACY", "HOSPITAL", "ADMIN"];
const LOGIN_ROLES: Role[] = ["USER", "DOCTOR", "PHARMACY", "HOSPITAL", "ADMIN"];

const REDIRECT_BY_ROLE: Record<Role, string> = {
  USER: "/",
  DOCTOR: "/doctor",
  PHARMACY: "/pharmacy/dashboard",
  HOSPITAL: "/hospital/dashboard",
  ADMIN: "/admin/dashbaord",
};

const VERIFY_REDIRECT_BY_ROLE: Record<Role, string> = {
  USER: "/",
  DOCTOR: "/doctor/profile/submit",
  PHARMACY: "/pharmacy/profile/submit",
  HOSPITAL: "/auth?mode=hospital-details&role=HOSPITAL",
  ADMIN: "/admin/dashbaord",
};

function isRole(value: string | null): value is Role {
  return !!value && LOGIN_ROLES.includes(value as Role);
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

  const [form, setForm] = useState<AuthFormState>({
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as "" | Role,
  });
  const [doctorForm, setDoctorForm] = useState<DoctorOnboardingFormState>({
    name: "",
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
  const [pharmacyForm, setPharmacyForm] = useState<PharmacyOnboardingFormState>({
    firstName: "",
    lastName: "",
    whatsAppNumber: "",
    profileRole: "Owner",
    pinCode: "",
    name: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    licenseNumber: "",
    gstNumber: "",
  });
  const [hospitalForm, setHospitalForm] = useState<HospitalOnboardingFormState>({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    website: "",
  });

  useEffect(() => {
    const m = searchParams.get("mode");
    if (m === "register") setMode("register");
    else if (m === "verify") setMode("verify");
    else if (m === "doctor-details") setMode("doctor-details");
    else if (m === "doctor-clinic") setMode("doctor-clinic");
    else if (m === "doctor-success") setMode("doctor-success");
    else if (m === "pharmacy-details") setMode("pharmacy-details");
    else if (m === "pharmacy-location") setMode("pharmacy-location");
    else if (m === "pharmacy-success") setMode("pharmacy-success");
    else if (m === "hospital-details") setMode("hospital-details");
    else if (m === "hospital-location") setMode("hospital-location");
    else if (m === "hospital-success") setMode("hospital-success");
    else setMode("login");

    const roleParam = searchParams.get("role");
    if (isRole(roleParam)) {
      setForm((prev) => ({ ...prev, role: roleParam }));
    }

    const emailParam = searchParams.get("email");
    if (emailParam) {
      setForm((prev) => ({ ...prev, email: emailParam }));
      setPharmacyForm((prev) => ({ ...prev, email: prev.email || emailParam }));
      setHospitalForm((prev) => ({ ...prev, email: prev.email || emailParam }));
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
    if (mode === "pharmacy-details") return 85;
    if (mode === "pharmacy-location") return 95;
    if (mode === "pharmacy-success") return 100;
    if (mode === "hospital-details") return 85;
    if (mode === "hospital-location") return 95;
    if (mode === "hospital-success") return 100;
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
    if (mode === "pharmacy-details" || mode === "pharmacy-location") return "Set up your pharmacy,<br/><em>start serving patients.</em>";
    if (mode === "pharmacy-success") return "You're all set,<br/><em>Pharmacy.</em>";
    if (mode === "hospital-details" || mode === "hospital-location") return "Set up your hospital,<br/><em>go live faster.</em>";
    if (mode === "hospital-success") return "You're all set,<br/><em>Hospital.</em>";
    return "Welcome back,<br/><em>Doctor.</em>";
  }, [mode]);

  const leftSub = useMemo(() => {
    if (mode === "register") return "Join 12,000+ doctors managing appointments, patients & revenue on OpenTreatment.";
    if (mode === "verify") return "Email verification keeps your patient data and clinic profile protected.";
    if (mode === "doctor-details") return "Tell us about your professional details so your profile is verification-ready.";
    if (mode === "doctor-clinic") return "Add clinic and specialisation details to complete your doctor onboarding.";
    if (mode === "doctor-success") return "Your profile is submitted and will be reviewed by admin shortly.";
    if (mode === "pharmacy-details") return "Tell us about yourself so we can personalise your pharmacy dashboard.";
    if (mode === "pharmacy-location") return "A few details about your store. You can update everything from Settings later.";
    if (mode === "pharmacy-success") return "Your pharmacy profile is submitted and under admin review.";
    if (mode === "hospital-details") return "Share hospital details so we can prepare your dashboard and approval flow.";
    if (mode === "hospital-location") return "Add hospital contact and location details. You can refine profile later.";
    if (mode === "hospital-success") return "Your hospital profile is submitted and will be reviewed by admin.";
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

      let signInRes: Awaited<ReturnType<typeof signIn>> | undefined;

      for (let attempt = 0; attempt < 3; attempt += 1) {
        signInRes = await signIn("credentials", {
          redirect: false,
          email: form.email,
          password: form.password,
        });
        if (!signInRes?.error) break;
        await wait(350);
      }

      if (signInRes?.error) {
        alert("Email verified. Please login to continue.");
        return router.push(`/auth?mode=login&role=${verifiedRole}&email=${encodeURIComponent(form.email)}`);
      }

      if (verifiedRole === "DOCTOR") {
        return router.push(
          `/auth?mode=doctor-details&role=DOCTOR&email=${encodeURIComponent(form.email)}`
        );
      }
      if (verifiedRole === "PHARMACY") {
        return router.push(
          `/auth?mode=pharmacy-details&role=PHARMACY&email=${encodeURIComponent(form.email)}`
        );
      }
      if (verifiedRole === "HOSPITAL") {
        return router.push(
          `/auth?mode=hospital-details&role=HOSPITAL&email=${encodeURIComponent(form.email)}`
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
    if (!doctorForm.name.trim()) {
      alert("Doctor name is required");
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

  async function submitPharmacyOnboarding() {
    const email = pharmacyForm.email.trim() || form.email.trim();
    const ownerName =
      `${pharmacyForm.firstName} ${pharmacyForm.lastName}`.trim() ||
      pharmacyForm.ownerName.trim();

    if (!pharmacyForm.name.trim()) {
      alert("Pharmacy / store name is required");
      return;
    }
    if (!email || !pharmacyForm.phone.trim()) {
      alert("Pharmacy email and phone are required");
      return;
    }
    if (!pharmacyForm.licenseNumber.trim()) {
      alert("License number is required");
      return;
    }
    if (!pharmacyForm.city.trim()) {
      alert("City is required");
      return;
    }
    if (!ownerName) {
      alert("First name and last name are required");
      return;
    }

    setLoading(true);
    try {
      const result = await completePharmacyOnboarding({
        ...pharmacyForm,
        ownerName,
        email,
        address: pharmacyForm.address.trim() || `PIN ${pharmacyForm.pinCode || "NA"}`,
        state: pharmacyForm.state.trim() || "NA",
        country: pharmacyForm.country.trim() || "India",
      });
      if (!result.ok) return alert(result.error || "Unable to submit pharmacy profile");
      router.push("/auth?mode=pharmacy-success");
    } catch {
      alert("Unable to submit pharmacy profile");
    } finally {
      setLoading(false);
    }
  }

  function continuePharmacyDetails() {
    if (!pharmacyForm.firstName.trim() || !pharmacyForm.lastName.trim()) {
      alert("First name and last name are required");
      return;
    }
    const email = pharmacyForm.email.trim() || form.email.trim();
    if (!email || !pharmacyForm.phone.trim()) {
      alert("Pharmacy email and phone are required");
      return;
    }
    router.push(
      `/auth?mode=pharmacy-location&role=PHARMACY&email=${encodeURIComponent(form.email)}`
    );
  }

  function continueHospitalDetails() {
    const email = hospitalForm.email.trim() || form.email.trim();
    if (!hospitalForm.name.trim()) {
      alert("Hospital name is required");
      return;
    }
    if (!hospitalForm.contactPerson.trim()) {
      alert("Contact person is required");
      return;
    }
    if (!hospitalForm.phone.trim() || !email) {
      alert("Hospital email and phone are required");
      return;
    }
    router.push(
      `/auth?mode=hospital-location&role=HOSPITAL&email=${encodeURIComponent(form.email)}`
    );
  }

  async function submitHospitalOnboarding() {
    const email = hospitalForm.email.trim() || form.email.trim();
    if (
      !hospitalForm.address.trim() ||
      !hospitalForm.city.trim() ||
      !hospitalForm.state.trim() ||
      !hospitalForm.country.trim()
    ) {
      alert("Address, city, state and country are required");
      return;
    }

    setLoading(true);
    try {
      const result = await completeHospitalOnboarding({
        ...hospitalForm,
        email,
      });
      if (!result.ok) return alert(result.error || "Unable to submit hospital profile");
      router.push("/auth?mode=hospital-success");
    } catch {
      alert("Unable to submit hospital profile");
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
      return;
    }
    if (mode === "pharmacy-details") {
      continuePharmacyDetails();
      return;
    }
    if (mode === "pharmacy-location") {
      void submitPharmacyOnboarding();
      return;
    }
    if (mode === "hospital-details") {
      continueHospitalDetails();
      return;
    }
    if (mode === "hospital-location") {
      void submitHospitalOnboarding();
    }
  }

  return (
    <>
      <div id="ob-overlay">
        <AuthLeftPanel mode={mode} leftTagline={leftTagline} leftSub={leftSub} />

        <div className="ob-right">
          <div className="ob-progress-bar"><div className="ob-progress-fill" style={{ width: `${progress}%` }} /></div>

          <div className="ob-right-inner">
            {mode === "register" && (
              <AuthRegisterStep
                form={form}
                setForm={setForm}
                registerRoles={REGISTER_ROLES}
                loading={loading}
                onGoogleAuth={onGoogleAuth}
                onSubmit={registerSubmit}
                onGoLogin={() => goMode("login")}
                onPasswordChange={updatePassword}
                pwMeta={pwMeta}
              />
            )}

            {mode === "verify" && (
              <AuthVerifyStep
                email={form.email}
                otp={otp}
                loading={loading}
                resendIn={resendIn}
                onSubmit={verifySubmit}
                onOtpChange={onOtpChange}
                onOtpKey={onOtpKey}
                onResend={() => setResendIn(30)}
                onAutoFill={() => setOtp(["1", "2", "3", "4", "5", "6"])}
              />
            )}

            <DoctorOnboardingSteps
              mode={mode}
              doctorForm={doctorForm}
              setDoctorForm={setDoctorForm}
              onSetupDashboard={() => router.push("/doctor/overview")}
            />
            <PharmacyOnboardingSteps
              mode={mode}
              pharmacyForm={pharmacyForm}
              setPharmacyForm={setPharmacyForm}
              onSetupDashboard={() => router.push("/pharmacy/dashboard")}
            />
            <HospitalOnboardingSteps
              mode={mode}
              hospitalForm={hospitalForm}
              setHospitalForm={setHospitalForm}
              onSetupDashboard={() => router.push("/hospital/dashboard")}
            />

            {mode === "login" && (
              <AuthLoginStep
                showForgot={showForgot}
                setShowForgot={setShowForgot}
                form={form}
                setForm={setForm}
                loginRoles={LOGIN_ROLES}
                loading={loading}
                onGoogleAuth={onGoogleAuth}
                onSubmit={loginSubmit}
                onGoRegister={() => goMode("register")}
              />
            )}
          </div>

          {mode !== "login" && mode !== "doctor-success" && mode !== "pharmacy-success" && mode !== "hospital-success" ? (
            <div className="ob-footer">
              <div className="ob-dots">
                <div className={`ob-dot ${mode === "register" ? "active" : "done"}`} />
                <div className={`ob-dot ${mode === "verify" ? "active" : ["doctor-details", "doctor-clinic", "pharmacy-details", "pharmacy-location", "hospital-details", "hospital-location"].includes(mode) ? "done" : ""}`} />
                <div className={`ob-dot ${mode === "doctor-details" || mode === "pharmacy-details" || mode === "hospital-details" ? "active" : mode === "doctor-clinic" || mode === "pharmacy-location" || mode === "hospital-location" ? "done" : ""}`} />
                <div className={`ob-dot ${mode === "doctor-clinic" || mode === "pharmacy-location" || mode === "hospital-location" ? "active" : ""}`} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  className="ob-btn ob-btn-ghost"
                  onClick={() => {
                    if (mode === "verify") return goMode("register");
                    if (mode === "doctor-details") return goMode("verify");
                    if (mode === "pharmacy-details") return goMode("verify");
                    if (mode === "pharmacy-location") return goMode("pharmacy-details");
                    if (mode === "doctor-clinic") return goMode("doctor-details");
                    if (mode === "hospital-details") return goMode("verify");
                    if (mode === "hospital-location") return goMode("hospital-details");
                    goMode("register");
                  }}
                >
                  Back
                </button>
                <button className="ob-btn ob-btn-primary" disabled={loading} onClick={handleFooterContinue}>
                  {mode === "doctor-clinic" || mode === "pharmacy-location" || mode === "hospital-location" ? "Setup Dashboard" : "Continue"}
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
        .ob-hint{font-size:11px;color:#475569;margin-top:3px}
        .role-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:18px}
        .role-chip{background:rgba(255,255,255,.025);border:1.5px solid rgba(255,255,255,.08);border-radius:10px;padding:11px 10px;cursor:pointer;text-align:center;transition:all .2s}
        .role-chip:hover{border-color:rgba(59,130,246,.35);background:rgba(59,130,246,.05)}
        .role-chip.sel{border-color:#3b82f6;background:rgba(59,130,246,.08);box-shadow:0 0 0 3px rgba(59,130,246,.08)}
        .role-chip-lbl{font-size:11px;font-weight:600;color:#94a3b8}
        .role-chip.sel .role-chip-lbl{color:#60a5fa}
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
          .role-grid{grid-template-columns:1fr}
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
