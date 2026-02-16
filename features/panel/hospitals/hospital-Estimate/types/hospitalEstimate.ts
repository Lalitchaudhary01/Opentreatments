export interface HospitalEstimate {
  id: string;
  policyId: string;
  hospitalId: string;
  procedureId: string;
  procedureCost: number;
  coveredAmount: number;
  outOfPocket: number;
  createdAt: Date;
}
