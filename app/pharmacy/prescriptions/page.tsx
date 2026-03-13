import { PharmacyPrescriptionsScreen } from "@/features/panel/pharmacy";
import PharmacyFirstTimeModuleState from "@/features/panel/pharmacy/components/PharmacyFirstTimeModuleState";
import { getPharmacyPanelGate } from "../_lib/pharmacyPanelGate";

export default async function PharmacyPrescriptionsPage() {
  const { firstTimeOperationalState } = await getPharmacyPanelGate();
  if (firstTimeOperationalState) {
    return (
      <PharmacyFirstTimeModuleState
        moduleTitle="Prescriptions"
        moduleDescription="Prescription queue and verification workflow will appear after incoming Rx orders begin."
      />
    );
  }
  return <PharmacyPrescriptionsScreen />;
}
