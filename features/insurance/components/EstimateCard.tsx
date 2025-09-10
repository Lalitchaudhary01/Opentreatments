"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Estimate } from "../types/insurance";

interface Props {
  estimate: Estimate;
}

export default function EstimateCard({ estimate }: Props) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Estimated Out-of-Pocket</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">
          ₹{estimate.outOfPocketMin.toLocaleString()} – ₹
          {estimate.outOfPocketMax.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {estimate.notes || "Based on policy coverage"}
        </p>
      </CardContent>
    </Card>
  );
}
