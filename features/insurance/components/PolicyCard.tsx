"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Policy } from "../types/insurance";
import { useInsurance } from "../hooks/useInsurance";

interface Props {
  policy: Policy;
  onView?: (id: string) => void;
}

export default function PolicyCard({ policy, onView }: Props) {
  const { removePolicy } = useInsurance();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{policy.provider}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>Policy No: {policy.policyNumber}</p>
        <p>Sum Insured: ₹{policy.sumInsured.toLocaleString()}</p>
        <p>Co-pay: {policy.coPay}%</p>
        <div className="flex gap-2 mt-3">
          {onView && (
            <Button variant="secondary" onClick={() => onView(policy.id)}>
              View
            </Button>
          )}
          <Button variant="destructive" onClick={() => removePolicy(policy.id)}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
