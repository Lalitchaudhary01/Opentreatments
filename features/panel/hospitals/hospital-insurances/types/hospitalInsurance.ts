// features/hospital-insurances/types/hospitalInsurance.ts

export interface HospitalInsurance {
  id: string;
  name: string;
  provider?: string | null;
  cashless: boolean;
  hospitalId: string;
}

export type CreateHospitalInsuranceInput = {
  name: string;
  provider?: string;
  cashless?: boolean;
};

export type UpdateHospitalInsuranceInput = {
  id: string;
  name?: string;
  provider?: string;
  cashless?: boolean;
};
