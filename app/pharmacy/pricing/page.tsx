import { PharmacyPricingScreen } from "@/features/panel/pharmacy";
import PharmacyFirstTimeModuleState from "@/features/panel/pharmacy/components/PharmacyFirstTimeModuleState";
import { getPharmacyPanelGate } from "../_lib/pharmacyPanelGate";

export default async function PharmacyPricingPage() {
  const { firstTimeOperationalState } = await getPharmacyPanelGate();
  if (firstTimeOperationalState) {
    return (
      <PharmacyFirstTimeModuleState
        moduleTitle="Pricing & Offers"
        moduleDescription="Pricing rules, discounts and offer performance will appear after you activate catalog and sales."
      />
    );
  }
  return <PharmacyPricingScreen />;
}
