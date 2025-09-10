import { MedicineDetail } from "../types/medicine";

export async function getSubstitutes(
  medicineId: string
): Promise<MedicineDetail[]> {
  // Dummy substitutes (normally fetch from DB relation Substitute)
  const substitutes: Medicine[] = [
    {
      id: "3",
      name: "Crocin",
      genericName: "Acetaminophen",
      form: "Tablet",
      strength: "500mg",
      packSize: "15 tablets",
      price: 28,
      availability: true,
      slug: "crocin-500",
      description: "Alternative for Paracetamol.",
      rxRequired: false,
      therapeuticClass: "Analgesic",
      pharmacyId: "ph1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return substitutes;
}
