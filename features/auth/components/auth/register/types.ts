export interface RegisterFormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
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
