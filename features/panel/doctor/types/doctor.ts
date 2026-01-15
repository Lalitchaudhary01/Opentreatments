import { DoctorStatus, Prisma } from "@prisma/client";

// Re-export for external usage
export { DoctorStatus };

// Full Doctor profile (DB shape)
export interface DoctorProfile {
  id: string;
  userId: string;

  name: string;
  specialties: string[];
  specialization: string;
  experience?: number | null;
  gender?: string | null;
  profilePic?: string | null;
  fees?: number | null;

  rating: number;
  totalReviews: number;

  languages: string[];
  availability?: Prisma.JsonValue | null;
  badges: string[];
  city?: string | null;

  status: DoctorStatus;

  createdAt: Date;
  updatedAt: Date;
}

// Doctor onboarding / update form input
export interface SubmitDoctorProfileInput {
  name: string;
  specialization: string;
  specialties: string[];
  languages: string[];
  experience?: number;
  gender?: string;
  profilePic?: string;
  fees?: number;
  availability?: string | Record<string, any>;
  badges?: string[];
  city?: string;
}

// Admin-side update input
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
