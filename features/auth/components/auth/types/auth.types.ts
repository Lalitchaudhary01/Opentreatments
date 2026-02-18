// ==================== Role Types ====================
export type Role = "USER" | "DOCTOR" | "ADMIN" | "HOSPITAL" | "PHARMACY" | "INSURANCE_COMPANY";

export type AuthMode = "login" | "register" | "verify";

// ==================== Form Data Interfaces ====================
export interface LoginFormData {
  email: string;
  password: string;
  role: Role | "";
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
  role: Role | "";
}

export interface VerifyFormData {
  email: string;
  otp: string;
}

// ==================== Combined Types ====================
export type ExtendedLoginFormData = LoginFormData & Partial<RegisterFormData> & Partial<VerifyFormData>;

export type ExtendedRegisterFormData = RegisterFormData & Partial<VerifyFormData>;

export type CompleteFormData = LoginFormData & RegisterFormData & VerifyFormData;

// ==================== Role Constants ====================
export const ROLES: Role[] = [
  "USER", 
  "DOCTOR", 
  "ADMIN", 
  "HOSPITAL", 
  "PHARMACY", 
  "INSURANCE_COMPANY",
];

// ==================== Helper Functions ====================
export const getRoleDisplayName = (role: string): string => {
  return role.replace("_", " ");
};

// Role validation function
export const isValidRole = (role: string): role is Role => {
  return ROLES.includes(role as Role);
};

// ==================== Type Guards (Fixed - No 'any') ====================
export const isLoginFormData = (data: unknown): data is LoginFormData => {
  if (typeof data !== 'object' || data === null) return false;
  
  const d = data as Record<string, unknown>;
  
  return (
    typeof d.email === 'string' &&
    typeof d.password === 'string' &&
    (d.role === '' || (typeof d.role === 'string' && isValidRole(d.role)))
  );
};

export const isRegisterFormData = (data: unknown): data is RegisterFormData => {
  if (typeof data !== 'object' || data === null) return false;
  
  const d = data as Record<string, unknown>;
  
  return (
    typeof d.name === 'string' &&
    typeof d.email === 'string' &&
    typeof d.phone === 'string' &&
    typeof d.password === 'string' &&
    typeof d.confirm === 'string' &&
    (d.role === '' || (typeof d.role === 'string' && isValidRole(d.role)))
  );
};

export const isVerifyFormData = (data: unknown): data is VerifyFormData => {
  if (typeof data !== 'object' || data === null) return false;
  
  const d = data as Record<string, unknown>;
  
  return (
    typeof d.email === 'string' &&
    typeof d.otp === 'string'
  );
};

// ==================== Type Guard for Complete Form ====================
export const isCompleteFormData = (data: unknown): data is CompleteFormData => {
  if (typeof data !== 'object' || data === null) return false;
  
  const d = data as Record<string, unknown>;
  
  return (
    typeof d.name === 'string' &&
    typeof d.email === 'string' &&
    typeof d.phone === 'string' &&
    typeof d.password === 'string' &&
    typeof d.confirm === 'string' &&
    (d.role === '' || (typeof d.role === 'string' && isValidRole(d.role))) &&
    typeof d.otp === 'string'
  );
};

// ==================== Default Values ====================
export const defaultLoginFormData: LoginFormData = {
  email: '',
  password: '',
  role: '',
};

export const defaultRegisterFormData: RegisterFormData = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirm: '',
  role: '',
};

export const defaultVerifyFormData: VerifyFormData = {
  email: '',
  otp: '',
};

export const defaultCompleteFormData: CompleteFormData = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirm: '',
  role: '',
  otp: '',
};