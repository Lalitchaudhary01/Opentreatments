import Image from "next/image";
import type { AuthMode } from "../../doctor/DoctorOnboardingSteps";

type Props = {
  mode: AuthMode;
  leftTagline: string;
  leftSub: string;
};

export default function AuthLeftPanel({ mode, leftTagline, leftSub }: Props) {
  const isCompletedAfterVerify = [
    "doctor-details",
    "doctor-clinic",
    "doctor-success",
    "pharmacy-details",
    "pharmacy-location",
    "pharmacy-success",
    "hospital-details",
    "hospital-location",
    "hospital-success",
    "lab-details",
    "lab-location",
    "lab-success",
    "login",
  ].includes(mode);

  const isStep3Active =
    mode === "doctor-details" || mode === "pharmacy-details" || mode === "hospital-details" || mode === "lab-details";
  const isStep3Done = [
    "doctor-clinic",
    "doctor-success",
    "pharmacy-location",
    "pharmacy-success",
    "hospital-location",
    "hospital-success",
    "lab-location",
    "lab-success",
  ].includes(mode);

  const isStep4Active =
    mode === "doctor-clinic" || mode === "pharmacy-location" || mode === "hospital-location" || mode === "lab-location";
  const isStep4Done = ["doctor-success", "pharmacy-success", "hospital-success", "lab-success"].includes(mode);

  const step3Label = mode.startsWith("pharmacy")
    ? "Your details"
    : mode.startsWith("hospital")
      ? "Hospital details"
      : mode.startsWith("lab")
        ? "Lab details"
      : "Personal &amp; credentials";
  const step4Label = mode.startsWith("pharmacy")
    ? "Pharmacy setup"
    : mode.startsWith("hospital")
      ? "Location &amp; contact"
      : mode.startsWith("lab")
        ? "Lab setup"
      : "Clinic &amp; specialisation";

  return (
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
            className="h-auto w-10 sm:w-12 lg:w-[51px]"
          />
          <span className="text-xl font-bold text-[#ECF5FF] sm:text-2xl">Open Treatment</span>
        </div>
      </div>

      <svg
        viewBox="0 0 340 300"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-55%)",
          width: 340,
          opacity: 0.18,
        }}
        fill="none"
      >
        <rect x="60" y="40" width="220" height="180" rx="18" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 4" />
        <rect x="80" y="60" width="80" height="100" rx="10" fill="rgba(59,130,246,.12)" stroke="#3b82f6" strokeWidth="1.2" />
        <circle cx="120" cy="95" r="22" stroke="#14b8a6" strokeWidth="1.5" />
        <line x1="120" y1="73" x2="120" y2="117" stroke="#14b8a6" strokeWidth="1.5" />
        <line x1="98" y1="95" x2="142" y2="95" stroke="#14b8a6" strokeWidth="1.5" />
      </svg>

      <div className="ob-left-content">
        <div className="ob-steps-side" id="ob-steps-side">
          <div className={`ob-sp ${mode === "register" ? "active" : "done"}`}><div className="ob-sp-num">{mode === "register" ? "1" : "✓"}</div><div className="ob-sp-label">Create account</div></div>
          <div className={`ob-sp ${mode === "verify" ? "active" : isCompletedAfterVerify ? "done" : "dim"}`}><div className="ob-sp-num">{mode === "verify" ? "2" : "✓"}</div><div className="ob-sp-label">Verify email</div></div>
          <div className={`ob-sp ${isStep3Active ? "active" : isStep3Done ? "done" : "dim"}`}><div className="ob-sp-num">{isStep3Active ? "3" : isStep3Done ? "✓" : "3"}</div><div className="ob-sp-label">{step3Label}</div></div>
          <div className={`ob-sp ${isStep4Active ? "active" : isStep4Done ? "done" : "dim"}`}><div className="ob-sp-num">{isStep4Done ? "✓" : "4"}</div><div className="ob-sp-label">{step4Label}</div></div>
        </div>
        <div className="ob-tagline" dangerouslySetInnerHTML={{ __html: leftTagline }} />
        <div className="ob-tagsub">{leftSub}</div>
      </div>
    </div>
  );
}
