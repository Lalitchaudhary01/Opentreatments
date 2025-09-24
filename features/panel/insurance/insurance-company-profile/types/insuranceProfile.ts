export enum InsuranceStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface InsuranceProfile {
  id: string; // Prisma UUID
  companyName: string;
  registrationNumber: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  documents: string[]; // Uploaded file URLs
  status: InsuranceStatus;
  createdAt: Date;
  updatedAt: Date;
}
// For profile submission
export type InsuranceProfileInput = Omit<
  InsuranceProfile,
  "id" | "status" | "createdAt" | "updatedAt"
>;

// For admin actions
export type AdminAction =
  | { action: "APPROVE"; companyId: string }
  | { action: "REJECT"; companyId: string }
  | { action: "DELETE"; companyId: string }
  | { action: "UPDATE"; companyId: string; data: Partial<InsuranceProfile> };
