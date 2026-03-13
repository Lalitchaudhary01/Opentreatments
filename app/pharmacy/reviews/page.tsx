import { PharmacyReviewsScreen } from "@/features/panel/pharmacy";
import PharmacyFirstTimeModuleState from "@/features/panel/pharmacy/components/PharmacyFirstTimeModuleState";
import { getPharmacyPanelGate } from "../_lib/pharmacyPanelGate";

export default async function PharmacyReviewsPage() {
  const { firstTimeOperationalState } = await getPharmacyPanelGate();
  if (firstTimeOperationalState) {
    return (
      <PharmacyFirstTimeModuleState
        moduleTitle="Customer Reviews"
        moduleDescription="Ratings, feedback and reply actions will be shown once customers complete delivered orders."
      />
    );
  }
  return <PharmacyReviewsScreen />;
}
