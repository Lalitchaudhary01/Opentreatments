export interface MedicineInput {
  name: string;
  genericName?: string;
  strength?: string;
  price: number;
  description?: string;
  brand?: string;
  category?: string;
  dosageForm?: string;
  gst?: number;
  manufacturer?: string;
  mrp?: number;
}

export interface MedicineView extends MedicineInput {
  id: string;
  pharmacyId: string;
  createdAt: Date;
  updatedAt: Date;
}
