import { PharmacyBillingScreen } from "@/features/panel/pharmacy";
import PharmacyFirstTimeModuleState from "@/features/panel/pharmacy/components/PharmacyFirstTimeModuleState";
import { getPharmacyPanelGate } from "../_lib/pharmacyPanelGate";

export default async function PharmacyBillingPage() {
  const { firstTimeOperationalState } = await getPharmacyPanelGate();
  if (firstTimeOperationalState) {
    return (
      <PharmacyFirstTimeModuleState
        moduleTitle="Billing / POS"
        moduleDescription="Point-of-sale billing and payment summaries will appear once your first sale is processed."
      />
    );
  }
  return <PharmacyBillingScreen />;
}
