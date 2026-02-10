export interface Service {
  id: string;
  name: string;
  cost?: number | null;
  description?: string | null;
  hospitalId: string;
}

export interface UpsertServiceInput {
  name: string;
  cost?: number;
  description?: string;
}
