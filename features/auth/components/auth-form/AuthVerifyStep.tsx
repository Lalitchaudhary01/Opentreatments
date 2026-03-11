import type { FormEvent, KeyboardEvent } from "react";

type Props = {
  email: string;
  otp: string[];
  loading: boolean;
  resendIn: number;
  onSubmit: (e: FormEvent) => Promise<void>;
  onOtpChange: (idx: number, val: string) => void;
  onOtpKey: (idx: number, e: KeyboardEvent<HTMLInputElement>) => void;
  onResend: () => void;
  onAutoFill: () => void;
};

export default function AuthVerifyStep({
  email,
  otp,
  loading,
  resendIn,
  onSubmit,
  onOtpChange,
  onOtpKey,
  onResend,
  onAutoFill,
}: Props) {
  return (
    <div className="ob-step active" id="ob-s1">
      <div className="ob-step-title">Verify your email</div>
      <div className="ob-step-sub">We sent a 6-digit code to your email address. Enter it below to continue.</div>

      <div className="ob-email-preview"><span>{email || "you@clinic.com"}</span></div>

      <form onSubmit={onSubmit}>
        <div className="otp-wrap" id="otp-wrap">
          {otp.map((d, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              className="otp-box"
              maxLength={1}
              inputMode="numeric"
              value={d}
              onChange={(e) => onOtpChange(i, e.target.value)}
              onKeyDown={(e) => onOtpKey(i, e)}
            />
          ))}
        </div>

        <button className="ob-btn ob-btn-primary" type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify & Continue"}
        </button>
      </form>

      <div className="ob-resend-row">
        {resendIn > 0 ? (
          <span>Resend code in <strong>{resendIn}s</strong></span>
        ) : (
          <button type="button" onClick={onResend}>Resend code</button>
        )}
      </div>
      <div className="ob-resend-row">Demo mode: use code <strong>123456</strong> <button type="button" onClick={onAutoFill}>Auto-fill</button></div>
    </div>
  );
}
