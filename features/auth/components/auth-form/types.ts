export type Role = "USER" | "DOCTOR" | "PHARMACY" | "HOSPITAL" | "LABORATORY" | "ADMIN";

export type AuthFormState = {
  email: string;
  password: string;
  confirmPassword: string;
  role: "" | Role;
};
