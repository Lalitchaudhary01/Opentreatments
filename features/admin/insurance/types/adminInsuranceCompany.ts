export type AdminInsuranceCompanyStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface AdminInsuranceCompany {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  description?: string;

  status: AdminInsuranceCompanyStatus;

  createdAt: string;
  updatedAt: string;
}
