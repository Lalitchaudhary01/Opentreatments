export interface Estimate {
  id: string;
  policyId: string;
  hospitalId: string;
  procedureId: string;
  procedureCost: number;
  coveredAmount: number;
  outOfPocket: number;
  createdAt: string;
}

export interface UpsertEstimateInput {
  policyId: string;
  procedureId: string;
  procedureCost: number;
  coveredAmount: number;
  outOfPocket: number;
}
