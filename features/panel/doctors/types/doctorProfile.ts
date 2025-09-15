export enum DoctorStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface DoctorProfile {
  id: string;
  userId: string; // reference to auth user
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number; // in years
  bio?: string;
  clinicAddress?: string;
  status: DoctorStatus;
  createdAt: Date;
  updatedAt: Date;
}
