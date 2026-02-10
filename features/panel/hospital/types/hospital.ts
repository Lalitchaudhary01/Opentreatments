import { HospitalStatus } from "@prisma/client";

export interface HospitalProfile {
  id: string;
  name: string;
  slug: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  logo?: string | null;
  image?: string | null;
  verified: boolean;
  status: HospitalStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitHospitalProfileInput {
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
}

export interface AdminUpdateHospitalInput {
  hospitalId: string;
  status?: HospitalStatus;
  verified?: boolean;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
}
