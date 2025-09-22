// /features/panel/admin/admin-pharmacies/types/adminPharmacy.ts

export type PharmacyStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface AdminPharmacy {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  licenseNumber: string;
  gstNumber?: string;
  status: PharmacyStatus;
  createdAt: string;
  updatedAt: string;
}
