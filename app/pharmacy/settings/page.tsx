import { PharmacySettingsScreen } from "@/features/panel/pharmacy";
import PharmacyFirstTimeModuleState from "@/features/panel/pharmacy/components/PharmacyFirstTimeModuleState";
import { getPharmacyPanelGate } from "../_lib/pharmacyPanelGate";

export default async function PharmacySettingsPage() {
  const { firstTimeOperationalState } = await getPharmacyPanelGate();
  if (firstTimeOperationalState) {
    return (
      <PharmacyFirstTimeModuleState
        moduleTitle="Settings"
        moduleDescription="Advanced settings can be configured now, while transactional preferences will activate after operations begin."
      />
    );
  }
  return <PharmacySettingsScreen />;
}
