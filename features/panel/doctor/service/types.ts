export type ServiceCategory =
  | "Consultation"
  | "Procedure"
  | "Diagnostic"
  | "Therapy"
  | "Preventive";

export type ServiceStatus = "Active" | "Inactive";

export type DoctorService = {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  discountPrice: number | null;
  duration: number;
  sessions: number;
  status: ServiceStatus;
  desc: string;
  avail: string;
  isOnline: boolean;
  maxSlots: number | null;
  tags: string[];
};
