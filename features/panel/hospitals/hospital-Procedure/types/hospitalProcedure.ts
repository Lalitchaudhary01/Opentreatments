// /features/hospital-procedures/types/hospitalProcedure.ts
export interface HospitalProcedure {
  id: string;
  name: string;
  description?: string | null;
  cost?: number | null;
  duration?: string | null;
  hospitalId: string;
}
