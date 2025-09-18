// /features/hospital-services/types/hospitalService.ts

export interface HospitalService {
  id: string;
  name: string;
  cost?: number;
  description?: string;
  hospitalId: string;
}

export type CreateHospitalServiceInput = Omit<HospitalService, "id">;
export type UpdateHospitalServiceInput = Partial<
  Omit<HospitalService, "id" | "hospitalId">
>;
