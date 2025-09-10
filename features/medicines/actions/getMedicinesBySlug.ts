import { MedicineBase } from "../types/medicine";
import { getMedicines } from "./getMedicnes";

export async function getMedicineBySlug(
  slug: string
): Promise<MedicineBase | null> {
  const medicines = await getMedicines();
  return medicines.find((m) => m.slug === slug) || null;
}
