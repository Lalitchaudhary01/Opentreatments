// Enum for doctor status
export enum DoctorStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

// Doctor profile type (matches IndependentDoctor model)
export interface DoctorProfile {
  id: string;
  userId: string;

  name: string;
  specialties: string[];      // multiple specialties
  specialization: string;     // primary specialization
  experience?: number;
  gender?: string;
  profilePic?: string;
  fees?: number;
  rating: number;
  totalReviews: number;
  languages: string[];
  availability?: Record<string, any>; // JSON in Prisma → flexible object
  badges: string[];
  city?: string;

  status: DoctorStatus;

  createdAt: Date;
  updatedAt: Date;
}

// Minimal type for creating a new doctor (form input)
export interface SubmitDoctorProfileInput {
  name: string;
  specialties: string[];
  specialization: string;
  experience?: number;
  gender?: string;
  profilePic?: string;
  fees?: number;
  languages: string[];
  availability?: Record<string, any>;
  badges?: string[];
  city?: string;
}

// Admin update input (approve/reject, edit info)
export interface AdminUpdateDoctorInput {
  doctorId: string;
  status?: DoctorStatus;
  name?: string;
  specialization?: string;
  specialties?: string[];
  experience?: number;
  fees?: number;
  city?: string;
}
