"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StepClinic({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Clinic Details</h2>
      <p className="text-muted-foreground">
        Where do you practice and what are your consultation charges?
      </p>

      <div className="space-y-4">
        {/* City */}
        <div className="space-y-2">
          <Label>Practice City</Label>
          <Input
            placeholder="Mumbai, Delhi, Jaipur..."
            value={data.city || ""}
            onChange={(e) =>
              setData((prev: any) => ({
                ...prev,
                city: e.target.value,
              }))
            }
          />
        </div>

        {/* Fees */}
        <div className="space-y-2">
          <Label>Consultation Fees (₹)</Label>
          <Input
            type="number"
            placeholder="1500"
            value={data.fees || ""}
            onChange={(e) =>
              setData((prev: any) => ({
                ...prev,
                fees: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}
