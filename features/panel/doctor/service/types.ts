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
  duration: number;
  sessions: number;
  status: ServiceStatus;
  desc: string;
  avail: string;
};
