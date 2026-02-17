export type HospitalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export interface Hospital {
  id: string;
  userId: string;
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
  status: HospitalStatus;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations (optional)
  doctors?: Doctor[];
  procedures?: Procedure[];
  services?: Service[];
  facilities?: Facility[];
  insurances?: Insurance[];
  estimates?: Estimate[];
}

export interface Doctor {
  id: string;
  hospitalId: string;
  name: string;
  specialization: string;
  experience?: number | null;
  profilePic?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Procedure {
  id: string;
  hospitalId: string;
  name: string;
  description?: string | null;
  cost?: number | null;
  duration?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  hospitalId: string;
  name: string;
  description?: string | null;
  cost?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Facility {
  id: string;
  hospitalId: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Insurance {
  id: string;
  hospitalId: string;
  name: string;
  provider?: string | null;
  cashless?: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Estimate {
  id: string;
  hospitalId: string;
  procedureId?: string | null;
  doctorId?: string | null;
  amount: number;
  currency: string;
  validUntil?: Date | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Input Types
export interface CreateHospitalInput {
  name: string;
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

export interface UpdateHospitalInput {
  name?: string;
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

export interface CreateDoctorInput {
  name: string;
  specialization: string;
  experience?: number;
  profilePic?: string;
}

export interface UpdateDoctorInput extends Partial<CreateDoctorInput> {
  id: string;
}

export interface CreateProcedureInput {
  name: string;
  description?: string;
  cost?: number;
  duration?: string;
}

export interface UpdateProcedureInput extends Partial<CreateProcedureInput> {
  id: string;
}

export interface CreateServiceInput {
  name: string;
  description?: string;
  cost?: number;
}

export interface UpdateServiceInput extends Partial<CreateServiceInput> {
  id: string;
}

export interface CreateFacilityInput {
  name: string;
  description?: string;
}

export interface UpdateFacilityInput extends Partial<CreateFacilityInput> {
  id: string;
}

export interface CreateInsuranceInput {
  name: string;
  provider?: string;
  cashless?: boolean;
}

export interface UpdateInsuranceInput extends Partial<CreateInsuranceInput> {
  id: string;
}

export interface CreateEstimateInput {
  procedureId?: string;
  doctorId?: string;
  amount: number;
  currency?: string;
  validUntil?: Date;
  notes?: string;
}

export interface UpdateEstimateInput extends Partial<CreateEstimateInput> {
  id: string;
}