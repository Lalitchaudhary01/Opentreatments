// features/admin-doctors/types/adminDoctor.ts

export enum DoctorStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface AdminDoctor {
  id: string;
  userId: string;
  name: string;
  specialties: string[];
  specialization: string;
  experience?: number;
  gender?: string;
  profilePic?: string;
  fees?: number;
  rating: number;
  totalReviews: number;
  languages: string[];
  availability?: any; // JSON (can refine to a structured type later)
  badges: string[];
  city?: string;

  status: DoctorStatus;

  createdAt: string;
  updatedAt: string;
}

export interface UpdateDoctorStatusInput {
  doctorId: string;
  status: DoctorStatus; // APPROVED | REJECTED
}

export interface DeleteDoctorInput {
  doctorId: string;
}
