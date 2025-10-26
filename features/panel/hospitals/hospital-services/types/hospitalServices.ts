// /features/hospital-services/types/hospitalService.ts

export interface HospitalService {
  id: string;
  name: string;
  cost?: number | null;
  description?: string | null;
  hospitalId: string;
}

export type CreateHospitalServiceInput = Omit<
  HospitalService,
  "id" | "hospitalId"
>;
export type UpdateHospitalServiceInput = Partial<
  Omit<HospitalService, "id" | "hospitalId">
>;
