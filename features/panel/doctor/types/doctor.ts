import { DoctorStatus, Prisma } from "@prisma/client";

// Export DoctorStatus for use in other files
export { DoctorStatus };

export interface DoctorProfile {
  id: string;
  userId: string;
  name: string;
  specialization: string;
  specialties: string[];
  experience?: number;
  gender?: string;
  profilePic?: string;
  fees?: number;
  languages?: string[];
  availability?: Record<string, string>;
  badges?: string[];
  city?: string;
  status: DoctorStatus;
  rating: number;
  totalReviews: number;
}

export interface SubmitDoctorProfileInput {
  name: string;
  specialization: string;
  specialties?: string[];
  experience?: number;
  gender?: string;
  profilePic?: string;
  fees?: number;
  languages?: string[];
  availability?: Record<string, string>;
  badges?: string[];
  city?: string;
}

export interface AdminUpdateDoctorInput
  extends Partial<SubmitDoctorProfileInput> {
  doctorId: string;
}
