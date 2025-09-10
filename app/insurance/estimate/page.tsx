import { Button } from "@/components/ui/button";
import { calculateEstimate } from "@/features/insurance/actions/calculatedEstimated";
import EstimateCard from "@/features/insurance/components/EstimateCard";
import Link from "next/link";

export default async function EstimatePage() {
  // For demo, calculate estimate for fixed policyId
  const policyId = "demo-policy-id"; // Replace with dynamic query later
  const estimate = await calculateEstimate(policyId, 100000);

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Estimate</h1>
      <EstimateCard estimate={estimate} />

      <div className="pt-4">
        <Link href="/hospitals?cashless=true">
          <Button>Find Cashless Hospitals</Button>
        </Link>
      </div>
    </div>
  );
}
