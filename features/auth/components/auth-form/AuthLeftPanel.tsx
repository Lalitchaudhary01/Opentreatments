import Image from "next/image";
import type { AuthMode } from "../../doctor/DoctorOnboardingSteps";

type Props = {
  mode: AuthMode;
  leftTagline: string;
  leftSub: string;
};

export default function AuthLeftPanel({ mode, leftTagline, leftSub }: Props) {
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
          <div className={`ob-sp ${mode === "verify" ? "active" : ["doctor-details", "doctor-clinic", "doctor-success", "pharmacy-details", "pharmacy-location", "pharmacy-success", "login"].includes(mode) ? "done" : "dim"}`}><div className="ob-sp-num">{mode === "verify" ? "2" : "✓"}</div><div className="ob-sp-label">Verify email</div></div>
          <div className={`ob-sp ${mode === "doctor-details" || mode === "pharmacy-details" ? "active" : ["doctor-clinic", "doctor-success", "pharmacy-location", "pharmacy-success"].includes(mode) ? "done" : "dim"}`}><div className="ob-sp-num">{mode === "doctor-details" || mode === "pharmacy-details" ? "3" : ["doctor-clinic", "doctor-success", "pharmacy-location", "pharmacy-success"].includes(mode) ? "✓" : "3"}</div><div className="ob-sp-label">{mode.startsWith("pharmacy") ? "Pharmacy details" : "Personal &amp; credentials"}</div></div>
          <div className={`ob-sp ${mode === "doctor-clinic" || mode === "pharmacy-location" ? "active" : ["doctor-success", "pharmacy-success"].includes(mode) ? "done" : "dim"}`}><div className="ob-sp-num">{["doctor-success", "pharmacy-success"].includes(mode) ? "✓" : "4"}</div><div className="ob-sp-label">{mode.startsWith("pharmacy") ? "Address &amp; business" : "Clinic &amp; specialisation"}</div></div>
        </div>
        <div className="ob-tagline" dangerouslySetInnerHTML={{ __html: leftTagline }} />
        <div className="ob-tagsub">{leftSub}</div>
      </div>
    </div>
  );
}
