export interface HospitalEstimate {
  id: string;
  hospitalId: string;
  procedureId: string;
  insuranceId: string;
  estimatedCost: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
