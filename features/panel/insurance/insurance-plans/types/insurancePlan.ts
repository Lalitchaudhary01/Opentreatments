import { JsonValue } from "@prisma/client";

export type PlanStatus = "ACTIVE" | "INACTIVE";

export interface CoverageDetails {
  diseasesCovered: string[]; // e.g. ["Cancer", "Diabetes", "Accidents"]
  exclusions: string[]; // e.g. ["Pre-existing for 2 years"]
  hospitalNetwork: string[]; // list of hospital IDs or names
}

export interface InsurancePlan {
  id: string;
  companyId: string; // relation to InsuranceCompany
  name: string;
  description?: string | null;
  coverageDetails: JsonValue; // JSON from Prisma
  premium: number; // monthly or yearly premium
  createdAt: Date;
  updatedAt: Date;
}
