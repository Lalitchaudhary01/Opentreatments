"use client";

import { FC, useEffect, useState } from "react";
import { UserClaim } from "../types/userInsuranceCompany";
import { getUserClaims } from "../actions/getUserClaims";

const UserClaimTracker: FC<{ userId: string }> = ({ userId }) => {
  const [claims, setClaims] = useState<UserClaim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserClaims(userId)
      .then((data) => setClaims(data))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading)
    return <div className="py-10 text-center">Loading claims...</div>;
  if (claims.length === 0)
    return <div className="py-10 text-center">No claims submitted.</div>;

  return (
    <div className="space-y-4">
      {claims.map((claim) => (
        <div key={claim.id} className="border rounded p-4 shadow-sm">
          <p>
            <strong>Plan ID:</strong> {claim.planId}
          </p>
          <p>
            <strong>Status:</strong> {claim.status}
          </p>
          <p>
            <strong>Bill Details:</strong> {JSON.stringify(claim.billDetails)}
          </p>
          <p>
            <strong>Submitted:</strong>{" "}
            {new Date(claim.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserClaimTracker;
