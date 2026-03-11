export type Role = "USER" | "DOCTOR" | "PHARMACY" | "ADMIN";

export type AuthFormState = {
  email: string;
  password: string;
  confirmPassword: string;
  role: "" | Role;
};
