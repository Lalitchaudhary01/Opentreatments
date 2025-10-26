"use client";

import React from "react";
import { Claim } from "../types/insuranceClaim";
import InsuranceClaimCard from "./InsuranceClaimCard";

interface Props {
  claims: Claim[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export default function InsuranceClaimList({
  claims,
  onApprove,
  onReject,
}: Props) {
  if (!claims.length) {
    return <p className="text-gray-500">No claims found.</p>;
  }

  return (
    <div>
      {claims.map((claim) => (
        <InsuranceClaimCard
          key={claim.id}
          claim={claim}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}
    </div>
  );
}
