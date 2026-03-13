import { PharmacyCatalogScreen } from "@/features/panel/pharmacy";
import PharmacyFirstTimeModuleState from "@/features/panel/pharmacy/components/PharmacyFirstTimeModuleState";
import { getPharmacyPanelGate } from "../_lib/pharmacyPanelGate";

export default async function PharmacyCatalogPage() {
  const { firstTimeOperationalState } = await getPharmacyPanelGate();
  if (firstTimeOperationalState) {
    return (
      <PharmacyFirstTimeModuleState
        moduleTitle="Catalog"
        moduleDescription="Medicine catalog stays empty until you add products, brands, and pricing details."
      />
    );
  }
  return <PharmacyCatalogScreen />;
}
