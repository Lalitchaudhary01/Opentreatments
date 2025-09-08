// /features/admin/hospitals/types/hospital.ts

export interface Hospital {
  id: string;
  name: string;
  slug: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;

  services?: Service[];
  facilities?: Facility[];
  insurances?: Insurance[];
  doctors?: Doctor[];
  procedures?: Procedure[];
}

export interface Service {
  id: string;
  name: string;
  cost?: number;
  description?: string;
  hospitalId: string;
}

export interface Facility {
  id: string;
  name: string;
  description?: string;
  hospitalId: string;
}

export interface Insurance {
  id: string;
  name: string;
  provider?: string;
  hospitalId: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience?: number;
  profilePic?: string;
  hospitalId: string;
}

export interface Procedure {
  id: string;
  name: string;
  description?: string;
  cost?: number;
  duration?: string;
  hospitalId: string;
}
