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
  description: string;
  coverageAmount: number; // total coverage amount
  premium: number; // monthly or yearly premium
  tenure: number; // tenure in months/years
  status: PlanStatus;
  coverageDetails: CoverageDetails;
  createdAt: Date;
  updatedAt: Date;
}
