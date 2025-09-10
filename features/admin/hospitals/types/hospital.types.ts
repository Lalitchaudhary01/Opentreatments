// Types for Hospital Form Data
export interface HospitalFormData {
  // Basic Info
  name: string;
  description: string;
  type: string;
  logo: string;
  image: string;

  // Location & Contact
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  website: string;

  // Settings & Status
  verified: boolean;
  emergencyAvailable: boolean;
  bedCount: number;
  availableBeds: number;
  rating: number;
  totalReviews: number;

  // Related Data
  facilities: Facility[];
  services: Service[];
  doctors: Doctor[];
  procedures: Procedure[];
  insurances: Insurance[];
}

// Individual Entity Types
export interface Facility {
  name: string;
  description?: string;
}

export interface Service {
  name: string;
  description?: string;
  cost?: number;
}

export interface Doctor {
  name: string;
  specialization: string;
  experience?: number;
  profilePic?: string;
}

export interface Procedure {
  name: string;
  description?: string;
  cost?: number;
  duration?: string;
}

export interface Insurance {
  name: string;
  provider?: string;
  cashless: boolean;
}

// Step Configuration
export interface StepConfig {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  fields: string[];
}

// Props for step components
export interface StepProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export interface ArrayStepProps {
  formData: any;
  onArrayAdd: (field: string) => void;
  onArrayUpdate: (
    field: string,
    index: number,
    key: string,
    value: any
  ) => void;
  onArrayRemove: (field: string, index: number) => void;
}

// Hospital types for server response
export interface Hospital extends HospitalFormData {
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Add Hospital Input (matches your server action)
export interface AddHospitalInput {
  name: string;
  description?: string;
  type?: string;
  logo?: string;
  image?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  verified?: boolean;
  emergencyAvailable?: boolean;
  bedCount?: number;
  availableBeds?: number;
  rating?: number;
  totalReviews?: number;
  facilities?: Array<{ name: string; description?: string }>;
  services?: Array<{ name: string; description?: string; cost?: number }>;
  doctors?: Array<{
    name: string;
    specialization: string;
    experience?: number;
    profilePic?: string;
  }>;
  procedures?: Array<{
    name: string;
    description?: string;
    cost?: number;
    duration?: string;
  }>;
  insurances?: Array<{
    name: string;
    provider?: string;
    cashless: boolean;
  }>;
}
