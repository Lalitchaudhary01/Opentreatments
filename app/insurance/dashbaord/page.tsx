"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { InsuranceProfile } from "@/features/panel/insurance/insurance-company-profile/types/insuranceProfile";
import { InsurancePlan } from "@/features/panel/insurance/insurance-plans/types/insurancePlan";
import { Claim } from "@/features/panel/insurance/insurance-claims/types/insuranceClaim";
import { getInsuranceProfile } from "@/features/panel/insurance/insurance-company-profile/actions/getInsuranceProfile";
import { getPlans } from "@/features/panel/insurance/insurance-plans/actions/getPlans";
import { getClaims } from "@/features/panel/insurance/insurance-claims/actions/getClaims";
import InsuranceStatusBadge from "@/features/panel/insurance/insurance-company-profile/components/InsuranceStatusBadge";
import InsuranceProfileView from "@/features/panel/insurance/insurance-company-profile/components/InsuranceProfileView";
// import { getInsuranceProfile } from "@/features/insurance-company-profile/actions/getInsuranceProfile";
// import { getInsurancePlans } from "@/features/insurance-company-plans/actions/getInsurancePlans";
// import { getInsuranceClaims } from "@/features/insurance-company-claims/actions/getInsuranceClaims";
// import InsuranceStatusBadge from "@/features/insurance-company-profile/components/InsuranceStatusBadge";
// import InsuranceProfileView from "@/features/insurance-company-profile/components/InsuranceProfileView";
// import { InsuranceProfile } from "@/features/insurance-company-profile/types/insuranceProfile";
// import { InsurancePlan } from "@/features/insurance-company-plans/types/insurancePlan";
// import { InsuranceClaim } from "@/features/insurance-company-claims/types/insuranceClaim";

export default function InsuranceDashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<InsuranceProfile | null>(null);
  const [plans, setPlans] = useState<InsurancePlan[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);

  useEffect(() => {
    if (!session?.user?.id) return;

    async function fetchData() {
      const [profileData, plansData, claimsData] = await Promise.all([
        getInsuranceProfile(session!.user.id),
        getPlans(session!.user.id),
        getClaims(session!.user.id),
      ]);
      setProfile(profileData);
      setPlans(plansData || []);
      setClaims(claimsData || []);
    }

    fetchData();
  }, [session]);

  if (!session?.user?.id) return <p>Unauthorized ❌</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Profile Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Insurance Profile</h2>
          {profile && <InsuranceStatusBadge status={profile.status} />}
        </div>
        {profile ? (
          <>
            <InsuranceProfileView profile={profile} />
            <button
              disabled={profile.status !== "APPROVED"}
              onClick={() => router.push("/insurance-company/profile/edit")}
              className={`mt-3 px-4 py-2 rounded text-white ${
                profile.status === "APPROVED"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/insurance-company/profile/submit")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Profile
          </button>
        )}
      </div>

      {/* Plans Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">My Insurance Plans</h2>
          <button
            onClick={() => router.push("/insurance-company/plans/create")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add New Plan
          </button>
        </div>
        {plans.length > 0 ? (
          <ul className="space-y-2">
            {plans.map((plan) => (
              <li key={plan.id} className="p-3 border rounded-lg">
                <p className="font-medium">{plan.name}</p>
                <p className="text-sm text-gray-600">Premium: {plan.premium}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No plans added yet.</p>
        )}
      </div>

      {/* Claims Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">My Claims</h2>
          <button
            onClick={() => router.push("/insurance-company/claims")}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            View All Claims
          </button>
        </div>
        {claims.length > 0 ? (
          <ul className="space-y-2">
            {claims.map((claim) => (
              <li key={claim.id} className="p-3 border rounded-lg">
                <p className="font-medium">Claim ID: {claim.id}</p>
                <p className="text-sm text-gray-600">
                  Amount: {claim.billDetails.amount} | Status:{" "}
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      claim.status === "APPROVED"
                        ? "bg-green-100 text-green-600"
                        : claim.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {claim.status}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No claims submitted yet.</p>
        )}
      </div>
    </div>
  );
}
