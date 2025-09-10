// Dummy search + filter

import { MedicineSearchResult } from "../types/medicine";

const dummyMedicines: MedicineSearchResult[] = [
  {
    id: "1",
    name: "Paracetamol",
    genericName: "Acetaminophen",
    form: "Tablet",
    strength: "500mg",
    packSize: "10 tablets",
    price: 25,
    availability: true,
    slug: "paracetamol-500",
    description: "Used for pain relief and fever.",
    rxRequired: false,
    therapeuticClass: "Analgesic",
    pharmacyId: "ph1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    form: "Capsule",
    strength: "250mg",
    packSize: "6 capsules",
    price: 50,
    availability: true,
    slug: "amoxicillin-250",
    description: "Antibiotic medicine.",
    rxRequired: true,
    therapeuticClass: "Antibiotic",
    pharmacyId: "ph2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function getMedicines(query?: string): Promise<MedicineSearchResult[]> {
  if (!query) return dummyMedicines;
  return dummyMedicines.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase())
  );
}
