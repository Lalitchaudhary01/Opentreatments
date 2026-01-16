export interface Procedure {
  id: string;
  name: string;
  description?: string | null;
  cost?: number | null;
  duration?: string | null;
  hospitalId: string;
}

export interface UpsertProcedureInput {
  name: string;
  description?: string;
  cost?: number;
  duration?: string;
}
