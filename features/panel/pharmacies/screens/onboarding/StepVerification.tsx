// import { PharmacyProfileInput } from "@/features/panel/pharmacy/types";

import { PharmacyProfileInput } from "../../types";

export function StepVerification({
  data,
}: {
  data: Partial<PharmacyProfileInput>;
}) {
  return (
    <div className="space-y-2 text-sm">
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className="flex justify-between">
          <span className="text-muted-foreground">{k}</span>
          <span>{String(v)}</span>
        </div>
      ))}
    </div>
  );
}
