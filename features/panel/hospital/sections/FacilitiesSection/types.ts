export interface Facility {
  id: string;
  name: string;
  description?: string | null;
  hospitalId: string;
}

export interface CreateFacilityInput {
  name: string;
  description?: string;
}
