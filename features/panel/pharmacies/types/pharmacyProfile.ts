export enum PharmacyStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface PharmacyProfile {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  gstNumber?: string | null;
  licenseNumber: string;
  status: PharmacyStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}