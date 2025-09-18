export enum HospitalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface AdminHospital {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  status: HospitalStatus;
  createdAt: Date;
}
