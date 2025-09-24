import { ClaimStatus } from "@/features/panel/insurance/insurance-claims/types/insuranceClaim";
import { InsurancePlan } from "@/features/panel/insurance/insurance-plans/types/insurancePlan";

// Users see only approved companies
export type UserCompany = {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  status: "APPROVED"; // always approved
  plans?: InsurancePlan[];
};

// User's submitted claim
export type UserClaim = {
  id: string;
  userId: string;
  companyId: string;
  planId: string;
  billDetails: any; // JSON object: uploaded bill, hospital, amount, procedure
  status: ClaimStatus;
  createdAt: Date;
  updatedAt: Date;
};
