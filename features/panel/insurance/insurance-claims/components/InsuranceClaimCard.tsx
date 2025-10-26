"use client";

import React from "react";
import { Claim } from "../types/insuranceClaim";
import InsuranceClaimStatusBadge from "./InsuranceClaimStatusBadge";

interface Props {
  claim: Claim;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export default function InsuranceClaimCard({
  claim,
  onApprove,
  onReject,
}: Props) {
  const billDetails = claim.billDetails as any;

  return (
    <div className="border rounded-lg p-4 shadow-sm mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {billDetails?.hospitalName || "N/A"} -{" "}
          {billDetails?.procedure || "N/A"}
        </h3>
        <InsuranceClaimStatusBadge status={claim.status} />
      </div>

      <p className="text-sm text-gray-600">
        Amount: ₹{billDetails?.amount?.toLocaleString() || "N/A"}
      </p>

      <div className="mt-2 text-xs text-gray-500">
        Submitted: {new Date(claim.createdAt).toLocaleDateString()}
      </div>

      {/* Actions */}
      <div className="mt-3 flex gap-2">
        {onApprove && (
          <button
            onClick={() => onApprove(claim.id)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            Approve
          </button>
        )}
        {onReject && (
          <button
            onClick={() => onReject(claim.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Reject
          </button>
        )}
      </div>
    </div>
  );
}
