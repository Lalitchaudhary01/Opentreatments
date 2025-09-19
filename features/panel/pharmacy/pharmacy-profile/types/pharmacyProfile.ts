// Pharmacy Status Enum
export enum PharmacyStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

// Pharmacy Profile Type
export interface PharmacyProfile {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  licenseNumber: string; // government issued license
  gstNumber?: string; // optional
  status: PharmacyStatus; // current approval status
  createdAt: Date;
  updatedAt: Date;
}
