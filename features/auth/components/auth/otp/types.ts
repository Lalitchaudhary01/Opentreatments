export interface OtpFormState {
  email: string;
  otp: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}
