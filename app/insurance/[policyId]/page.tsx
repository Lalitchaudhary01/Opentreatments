import { getPolicyById } from "@/features/insurance/actions/getPolicyById";
import { notFound } from "next/navigation";

interface Props {
  params: { policyId: string };
}

export default async function PolicyDetailPage({ params }: Props) {
  const policy = await getPolicyById(params.policyId);

  if (!policy) return notFound();

  return (
    <div className="container mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold">{policy.provider}</h1>
      <div className="space-y-2">
        <p>
          <strong>Policy No:</strong> {policy.policyNumber}
        </p>
        <p>
          <strong>Sum Insured:</strong> ₹{policy.sumInsured.toLocaleString()}
        </p>
        <p>
          <strong>Deductible:</strong> ₹{policy.deductible.toLocaleString()}
        </p>
        <p>
          <strong>Co-pay:</strong> {policy.coPay}%
        </p>
        <p>
          <strong>Valid Till:</strong>{" "}
          {new Date(policy.validTill).toDateString()}
        </p>
      </div>
    </div>
  );
}
