// /features/hospital-profile/types/hospitalProfile.ts

export enum HospitalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface HospitalProfile {
  id: string;
  userId: string;

  name: string;
  slug: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  image?: string;

  status: HospitalStatus;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string

  // Optional relations (if you need them in profile view)
  services?: HospitalService[];
  facilities?: HospitalFacility[];
  doctors?: HospitalDoctor[];
  procedures?: HospitalProcedure[];
  insurances?: HospitalInsurance[];
}

// Minimal related types (expand in their own feature folders)
export interface HospitalService {
  id: string;
  name: string;
  cost?: number;
  description?: string;
}

export interface HospitalFacility {
  id: string;
  name: string;
  description?: string;
}

export interface HospitalDoctor {
  id: string;
  name: string;
  specialization: string;
  experience?: number;
  profilePic?: string;
}

export interface HospitalProcedure {
  id: string;
  name: string;
  description?: string;
  cost?: number;
  duration?: string;
}

export interface HospitalInsurance {
  id: string;
  name: string;
  provider?: string;
  cashless: boolean;
}
