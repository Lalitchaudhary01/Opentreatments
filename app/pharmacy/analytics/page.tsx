import { PharmacyAnalyticsScreen } from "@/features/panel/pharmacy";
import PharmacyFirstTimeModuleState from "@/features/panel/pharmacy/components/PharmacyFirstTimeModuleState";
import { getPharmacyPanelGate } from "../_lib/pharmacyPanelGate";

export default async function PharmacyAnalyticsPage() {
  const { firstTimeOperationalState } = await getPharmacyPanelGate();
  if (firstTimeOperationalState) {
    return (
      <PharmacyFirstTimeModuleState
        moduleTitle="Analytics"
        moduleDescription="Performance insights, trends and forecasting will appear here once your pharmacy starts transacting."
      />
    );
  }
  return <PharmacyAnalyticsScreen />;
}
