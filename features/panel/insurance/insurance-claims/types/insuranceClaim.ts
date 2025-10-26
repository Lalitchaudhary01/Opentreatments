import { ClaimStatus as ClaimStatusEnum } from "@prisma/client";

export type ClaimStatus = ClaimStatusEnum;

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

  billDetails: Prisma.JsonValue;
  status: ClaimStatus;

  createdAt: Date;
  updatedAt: Date;
}
