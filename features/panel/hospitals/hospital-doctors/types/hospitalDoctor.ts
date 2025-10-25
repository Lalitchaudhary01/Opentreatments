// Doctor specialization (as free string, ya enum bana sakte ho)
export type DoctorSpecialization =
  | "CARDIOLOGY"
  | "ORTHOPEDICS"
  | "NEUROLOGY"
  | "PEDIATRICS"
  | "GENERAL"
  | "OTHER";

// Hospital doctor type (matches Prisma Doctor model)
export interface HospitalDoctor {
  id: string;
  hospitalId: string;

  name: string;
  specialization: string; // using string from DB
  experience?: number | null;
  profilePic?: string | null;

  createdAt?: Date; // Prisma default
  updatedAt?: Date; // Prisma default
}
