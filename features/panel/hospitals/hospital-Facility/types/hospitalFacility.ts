export interface HospitalFacility {
  id: string;
  name: string;
  description?: string | null;
  hospitalId: string;
}

export type CreateHospitalFacilityInput = Omit<
  HospitalFacility,
  "id" | "hospitalId"
>;
export type UpdateHospitalFacilityInput = Partial<
  Omit<HospitalFacility, "hospitalId">
> & { id: string };
