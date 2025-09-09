export interface Facility {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  name: string;
  cost?: number | null;
  description?: string | null;
}

export interface Insurance {
  id: string;
  name: string;
  cashless: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience?: number | null;
}

export interface Procedure {
  id: string;
  name: string;
  cost?: number | null;
  description?: string | null;
  duration?: string | null;
}

export interface Hospital {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  website?: string | null;
  logo?: string | null;

  facilities: Facility[];
  services: Service[];
  insurances: Insurance[];
  doctors: Doctor[];
  procedures: Procedure[];
}
