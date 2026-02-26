export interface PharmacyMedicine {
  id: string;
  name: string;
  genericName?: string | null;
  strength?: string | null;
  price: number;
  description?: string | null;
  brand?: string | null;
  category?: string | null;
  dosageForm?: string | null;
  gst?: number | null;
  manufacturer?: string | null;
  mrp?: number | null;
  pharmacyId: string;
  createdAt: Date;
  updatedAt: Date;
}