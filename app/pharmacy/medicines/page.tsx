import { getMedicines } from "@/features/panel/pharmacy/pharmacy-medicines/actions/getMedicines";
import PharmacyFirstTimeModuleState from "@/features/panel/pharmacy/components/PharmacyFirstTimeModuleState";
import PharmacyMedicineList from "@/features/panel/pharmacy/pharmacy-medicines/components/PharmacyMedicineList";
import { getPharmacyPanelGate } from "../_lib/pharmacyPanelGate";

export default async function MedicinesPage() {
  const { firstTimeOperationalState } = await getPharmacyPanelGate();
  if (firstTimeOperationalState) {
    return (
      <PharmacyFirstTimeModuleState
        moduleTitle="Medicine Catalog"
        moduleDescription="Medicine list is empty right now. Add your first product to start inventory and billing flows."
      />
    );
  }

  const medicines = await getMedicines();

  return (
    <div className="p-6 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-white">Medicine Catalog</h1>
      <PharmacyMedicineList medicines={medicines} />
    </div>
  );
}
