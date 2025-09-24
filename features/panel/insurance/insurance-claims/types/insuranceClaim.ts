export type ClaimStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export interface BillDetails {
  hospitalName: string;
  procedure: string;
  amount: number;
  documents: string[]; // uploaded file URLs/paths
}

export interface Claim {
  id: string;
  userId: string;
  companyId: string;
  planId: string;

  billDetails: BillDetails;
  status: ClaimStatus;

  createdAt: Date;
  updatedAt: Date;
}
