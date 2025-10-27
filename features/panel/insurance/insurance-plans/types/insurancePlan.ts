// Define a reusable JsonValue type for Prisma JSON fields
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

// Plan status type
export type PlanStatus = "ACTIVE" | "INACTIVE";

// Details about coverage
export interface CoverageDetails {
  diseasesCovered: string[]; // e.g. ["Cancer", "Diabetes", "Accidents"]
  exclusions: string[]; // e.g. ["Pre-existing for 2 years"]
  hospitalNetwork: string[]; // e.g. ["Hospital A", "Hospital B"]
}

// Insurance Plan type
export interface InsurancePlan {
  id: string;
  companyId: string; // relation to InsuranceCompany
  name: string;
  description?: string | null;
  coverageDetails: JsonValue; // JSON from Prisma
  premium: number; // monthly or yearly premium
  coverageAmount: number; // newly added field
  createdAt: Date;
  updatedAt: Date;
  claims: any[]; // related claims, can type further if needed
}

// Type for form submission / API (omit readonly or auto-generated fields)
export type InsurancePlanInput = Omit<
  InsurancePlan,
  "id" | "createdAt" | "updatedAt" | "claims"
>;
