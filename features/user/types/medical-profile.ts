export interface Address {
  id?: string;
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
}

export interface EmergencyContact {
  id?: string;
  name?: string;
  phone?: string;
  relation?: string;
}

export interface HealthRecord {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadDate: string;
  fileType: string;
}

export interface MedicalProfile {
  id: string;
  userId: string;

  // Personal Details
  fullName?: string;
  gender?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  maritalStatus?: string;
  profileImage?: string;

  // Medical Information
  height?: number;
  weight?: number;
  bmi?: number;
  allergies: string[];
  chronicDiseases: string[];
  medications: string[];
  surgeries: string[];
  familyHistory: string[];

  // Lifestyle Information
  smokingHabit?: boolean;
  alcoholConsumption?: string;
  exerciseFrequency?: string;
  foodPreference?: string;
  sleepDuration?: number;

  // Insurance
  insuranceProvider?: string;
  policyNumber?: string;
  policyExpiry?: string;

  // Relations
  healthRecords: HealthRecord[];
  address?: Address;
  emergencyContact?: EmergencyContact;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export type MedicalProfileUpdate = Partial<
  Omit<
    MedicalProfile,
    "id" | "userId" | "createdAt" | "updatedAt" | "healthRecords"
  >
> & {
  address?: Partial<Address>;
  emergencyContact?: Partial<EmergencyContact>;
};
