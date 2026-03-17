export type Role = "USER" | "DOCTOR" | "PHARMACY" | "HOSPITAL" | "ADMIN";

export type AuthFormState = {
  email: string;
  password: string;
  confirmPassword: string;
  role: "" | Role;
};
