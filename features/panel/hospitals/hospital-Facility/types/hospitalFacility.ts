export interface HospitalFacility {
  id: string;
  name: string;
  description?: string;
  hospitalId: string;
}

export type CreateHospitalFacilityInput = Omit<HospitalFacility, "id">;
export type UpdateHospitalFacilityInput = Partial<Omit<HospitalFacility, "hospitalId">> & { id: string };
