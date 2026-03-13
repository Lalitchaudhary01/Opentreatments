import { PharmacyMultistoreScreen } from "@/features/panel/pharmacy";
import PharmacyFirstTimeModuleState from "@/features/panel/pharmacy/components/PharmacyFirstTimeModuleState";
import { getPharmacyPanelGate } from "../_lib/pharmacyPanelGate";

export default async function PharmacyMultistorePage() {
  const { firstTimeOperationalState } = await getPharmacyPanelGate();
  if (firstTimeOperationalState) {
    return (
      <PharmacyFirstTimeModuleState
        moduleTitle="Multi-Store"
        moduleDescription="Branch-wise performance and consolidated reports unlock after your first operational data is recorded."
      />
    );
  }
  return <PharmacyMultistoreScreen />;
}
