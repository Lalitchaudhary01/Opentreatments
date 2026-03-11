import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { AuthFormState, Role } from "./types";

type Props = {
  showForgot: boolean;
  setShowForgot: Dispatch<SetStateAction<boolean>>;
  form: AuthFormState;
  setForm: Dispatch<SetStateAction<AuthFormState>>;
  loginRoles: Role[];
  loading: boolean;
  onGoogleAuth: () => Promise<void>;
  onSubmit: (e: FormEvent) => Promise<void>;
  onGoRegister: () => void;
};

export default function AuthLoginStep({
  showForgot,
  setShowForgot,
  form,
  setForm,
  loginRoles,
  loading,
  onGoogleAuth,
  onSubmit,
  onGoRegister,
}: Props) {
  return (
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
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M19.665 16.395c-.287.66-.42.955-.79 1.536-.517.81-1.246 1.818-2.154 1.825-.807.008-1.015-.525-2.111-.52-1.095.006-1.322.53-2.13.522-.907-.009-1.597-.918-2.114-1.727-1.447-2.27-1.599-4.93-.705-6.304.635-.976 1.637-1.549 2.58-1.549.96 0 1.564.53 2.355.53.768 0 1.236-.53 2.347-.53.84 0 1.729.457 2.361 1.244-2.077 1.14-1.74 4.102.36 4.973zm-3.715-8.59c.42-.54.739-1.303.624-2.055-.685.047-1.487.487-1.95 1.052-.42.513-.769 1.274-.632 2.002.748.022 1.522-.425 1.958-.999z"/></svg>
              Continue with Apple
            </button>
            <div className="ob-divider">or sign in with email</div>

            <form onSubmit={onSubmit}>
              <div className="ob-ff">
                <label>Select role</label>
                <select value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value as Role }))} required>
                  <option value="">Choose role</option>
                  {loginRoles.map((r) => (
                    <option key={r} value={r}>{r}</option>
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

            <div className="ob-link-row" style={{ marginTop: 22 }}>New to OpenTreatment? <a onClick={onGoRegister}>Create account -&gt;</a></div>
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
  );
}
