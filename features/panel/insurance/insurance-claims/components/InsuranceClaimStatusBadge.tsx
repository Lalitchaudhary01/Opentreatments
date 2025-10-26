"use client";

import React from "react";
import { ClaimStatus } from "../types/insuranceClaim";

interface Props {
  status: ClaimStatus;
}

export default function InsuranceClaimStatusBadge({ status }: Props) {
  const colors: Record<ClaimStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
}
