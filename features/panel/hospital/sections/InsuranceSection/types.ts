export interface Insurance {
  id: string;
  name: string;
  provider?: string | null;
  cashless: boolean;
  hospitalId: string;
}

export interface UpsertInsuranceInput {
  name: string;
  provider?: string;
  cashless?: boolean;
}
