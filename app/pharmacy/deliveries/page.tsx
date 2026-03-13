import { PharmacyDeliveriesScreen } from "@/features/panel/pharmacy";
import PharmacyFirstTimeModuleState from "@/features/panel/pharmacy/components/PharmacyFirstTimeModuleState";
import { getPharmacyPanelGate } from "../_lib/pharmacyPanelGate";

export default async function PharmacyDeliveriesPage() {
  const { firstTimeOperationalState } = await getPharmacyPanelGate();
  if (firstTimeOperationalState) {
    return (
      <PharmacyFirstTimeModuleState
        moduleTitle="Deliveries"
        moduleDescription="Delivery assignments, tracking and fulfilment metrics will show after incoming orders begin."
      />
    );
  }
  return <PharmacyDeliveriesScreen />;
}
