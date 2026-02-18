export type AuthMode = "login" | "register" | "verify";

export interface AuthFormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
  otp: string;
  role: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
