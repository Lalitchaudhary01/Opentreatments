export type LabStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

export type AdminLab = {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  registrationNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  status: LabStatus;
  createdAt: string;
  updatedAt: string;
};
