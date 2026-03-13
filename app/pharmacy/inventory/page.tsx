import { PharmacyInventoryScreen } from "@/features/panel/pharmacy";
import PharmacyFirstTimeModuleState from "@/features/panel/pharmacy/components/PharmacyFirstTimeModuleState";
import { getPharmacyPanelGate } from "../_lib/pharmacyPanelGate";

export default async function PharmacyInventoryPage() {
  const { firstTimeOperationalState } = await getPharmacyPanelGate();
  if (firstTimeOperationalState) {
    return (
      <PharmacyFirstTimeModuleState
        moduleTitle="Stock & Inventory"
        moduleDescription="Inventory levels, batches and expiry alerts will appear once you add opening stock."
      />
    );
  }
  return <PharmacyInventoryScreen />;
}
