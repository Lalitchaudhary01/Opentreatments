// /features/admin/hospitals/types/hospital.ts

export interface FacilityInput {
  name: string;
  description?: string;
}

export interface ServiceInput {
  name: string;
  cost?: number;
  description?: string;
}

export interface InsuranceInput {
  name: string;
  provider?: string;
}

export interface DoctorInput {
  name: string;
  specialization?: string;
  experience?: number; // years
  profilePic?: string;
}

export interface ProcedureInput {
  name: string;
  description?: string;
  cost?: number;
  duration?: string; // e.g. "2 hours", "3 days"
}

export interface AddHospitalInput {
  name: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;

  facilities?: FacilityInput[];
  services?: ServiceInput[];
  insurances?: InsuranceInput[];
  doctors?: DoctorInput[];
  procedures?: ProcedureInput[];
}

export interface Hospital extends AddHospitalInput {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;

  facilities: FacilityInput[];
  services: ServiceInput[];
  insurances: InsuranceInput[];
  doctors: DoctorInput[];
  procedures: ProcedureInput[];
}
