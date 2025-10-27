export type UserHospital = {
  id: string;
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
  verified: boolean;
  status: string;
  doctors: {
    id: string;
    name: string;
    specialization: string;
  }[];
  procedures: {
    id: string;
    name: string;
    cost?: number;
    duration?: string;
  }[];
  services?: {
    id: string;
    name: string;
    cost?: number;
    description?: string;
  }[];
  facilities?: {
    id: string;
    name: string;
    description?: string;
  }[];
};
