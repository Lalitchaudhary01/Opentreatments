import { PharmacyStatus } from "@prisma/client";

export interface PharmacyProfileInput {
  name: string;
  phone: string;
  email: string;
  ownerName: string;
  licenseNumber: string;
  gstNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export interface PharmacyProfile extends PharmacyProfileInput {
  id: string;
  userId: string;
  status: PharmacyStatus;
  createdAt: Date;
  updatedAt: Date;
}
