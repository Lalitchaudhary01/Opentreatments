"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { InsuranceProfile } from "@/features/panel/insurance/insurance-company-profile/types/insuranceProfile";
import { getInsuranceProfile } from "@/features/panel/insurance/insurance-company-profile/actions/getInsuranceProfile";
import InsuranceStatusBadge from "@/features/panel/insurance/insurance-company-profile/components/InsuranceStatusBadge";
import InsuranceProfileView from "@/features/panel/insurance/insurance-company-profile/components/InsuranceProfileView";
// import { getInsuranceProfile } from "@/features/insurance-company-profile/actions/getInsuranceProfile";
// import InsuranceProfileView from "@/features/insurance-company-profile/components/InsuranceProfileView";
// import InsuranceStatusBadge from "@/features/insurance-company-profile/components/InsuranceStatusBadge";
// import { InsuranceProfile } from "@/features/insurance-company-profile/types/insuranceProfile";

export default function ViewProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<InsuranceProfile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!session?.user?.id) return;
      const data = await getInsuranceProfile(session.user.id);
      setProfile(data);
    }
    fetchProfile();
  }, [session]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">My Insurance Profile</h1>
        <InsuranceStatusBadge status={profile.status} />
      </div>
      <InsuranceProfileView profile={profile} />
    </div>
  );
}
