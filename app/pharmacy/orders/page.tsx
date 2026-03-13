import { PharmacyOrdersScreen } from "@/features/panel/pharmacy";
import PharmacyFirstTimeModuleState from "@/features/panel/pharmacy/components/PharmacyFirstTimeModuleState";
import { getPharmacyPanelGate } from "../_lib/pharmacyPanelGate";

export default async function PharmacyOrdersPage() {
  const { firstTimeOperationalState } = await getPharmacyPanelGate();
  if (firstTimeOperationalState) {
    return (
      <PharmacyFirstTimeModuleState
        moduleTitle="Customer Orders"
        moduleDescription="Order queue, fulfilment states and quick actions will show once patients place orders."
      />
    );
  }
  return <PharmacyOrdersScreen />;
}
