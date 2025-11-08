export type AdminInsuranceCompanyStatus = "PENDING" | "APPROVED" | "REJECTED";

export type AdminInsuranceCompany = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null; // maps to contactPhone
  address: string | null;
  licenseNumber: string | null; // maps to registrationNumber
  website?: string | null;
  status: AdminInsuranceCompanyStatus;
  createdAt: string;
  updatedAt: string;
};
