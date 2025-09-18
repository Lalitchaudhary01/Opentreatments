"use client";

import { useEffect, useState } from "react";
import { getEstimates } from "../actions/hospitalEstimateActions";
import HospitalEstimateCard from "./HospitalEstimateCard";
import HospitalEstimateForm from "./HospitalEstimateForm";

export default function HospitalEstimateList({
  hospitalId,
}: {
  hospitalId: string;
}) {
  const [estimates, setEstimates] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getEstimates(hospitalId);
      setEstimates(data);
    })();
  }, [hospitalId, refresh]);

  return (
    <div className="space-y-4">
      <HospitalEstimateForm
        hospitalId={hospitalId}
        onSuccess={() => setRefresh(!refresh)}
      />
      <div className="space-y-2">
        {estimates.map((estimate) => (
          <HospitalEstimateCard
            key={estimate.id}
            estimate={estimate}
            onDeleted={() => setRefresh(!refresh)}
          />
        ))}
      </div>
    </div>
  );
}
