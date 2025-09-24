"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getClaims } from "@/features/panel/insurance/insurance-claims/actions/getClaims";
import { updateClaimStatus } from "@/features/panel/insurance/insurance-claims/actions/updateClaimStatus";
import InsuranceClaimList from "@/features/panel/insurance/insurance-claims/components/InsuranceClaimList";
import { Claim } from "@/features/panel/insurance/insurance-claims/types/insuranceClaim";

export default function ClaimsPage() {
  const { data: session, status } = useSession();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  // Wait for session
  useEffect(() => {
    if (status === "authenticated") {
      const companyId = session.user?.companyId; // assuming you store companyId in session
      if (!companyId) {
        console.error("No companyId found in session");
        setLoading(false);
        return;
      }

      async function fetchClaims() {
        try {
          const data = await getClaims(companyId);
          setClaims(data as any);
        } catch (error) {
          console.error("Error fetching claims:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchClaims();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  const handleApprove = async (id: string) => {
    try {
      const updated = await updateClaimStatus(id, "APPROVED");
      setClaims((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: updated.status } : c))
      );
    } catch (err) {
      console.error("Error approving claim:", err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const updated = await updateClaimStatus(id, "REJECTED");
      setClaims((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: updated.status } : c))
      );
    } catch (err) {
      console.error("Error rejecting claim:", err);
    }
  };

  if (loading) return <p>Loading claims...</p>;

  if (status !== "authenticated") return <p>Please login to view claims.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Submitted Claims</h1>
      <InsuranceClaimList
        claims={claims}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
