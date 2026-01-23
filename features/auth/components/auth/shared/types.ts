export type AuthTitle =
  | "Login"
  | "Register"
  | "Verify Email";

export interface AuthHeaderProps {
  title: AuthTitle;
  subtitle?: string;
}
