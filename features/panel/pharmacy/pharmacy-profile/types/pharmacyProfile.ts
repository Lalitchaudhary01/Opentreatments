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
  pinCode?: string;
  state: string;
  country: string;
  licenseNumber: string; // government issued license
  gstNumber?: string; // optional
  bio?: string;
  status: PharmacyStatus; // current approval status
  createdAt: Date;
  updatedAt: Date;
}
