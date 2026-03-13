import { PharmacyCustomersScreen } from "@/features/panel/pharmacy";
import PharmacyFirstTimeModuleState from "@/features/panel/pharmacy/components/PharmacyFirstTimeModuleState";
import { getPharmacyPanelGate } from "../_lib/pharmacyPanelGate";

export default async function PharmacyCustomersPage() {
  const { firstTimeOperationalState } = await getPharmacyPanelGate();
  if (firstTimeOperationalState) {
    return (
      <PharmacyFirstTimeModuleState
        moduleTitle="Customers"
        moduleDescription="Customer list and retention insights will appear after your pharmacy starts serving orders."
      />
    );
  }
  return <PharmacyCustomersScreen />;
}
