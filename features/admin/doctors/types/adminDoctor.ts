// features/admin-doctors/types/adminDoctor.ts - Update this
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
  experience: number; // Change from optional to required
  gender: string; // Change from optional
  profilePic: string; // Change from optional
  fees: number; // Change from optional
  rating: number;
  totalReviews: number;
  languages: string[];
  availability: string; // Change from any to string (JSON)
  badges: string[];
  city: string; // Change from optional
  status: DoctorStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateDoctorStatusInput {
  doctorId: string;
  status: DoctorStatus;
}

export interface DeleteDoctorInput {
  doctorId: string;
}
