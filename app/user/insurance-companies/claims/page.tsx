"use client";

import { useEffect, useState } from "react";
import { getUserClaims } from "@/features/user-insurance-companies/actions/getUserClaims";
import { UserClaim } from "@/features/user-insurance-companies/types/userInsuranceCompany";
import UserClaimTracker from "@/features/user-insurance-companies/components/UserClaimTracker";
import { useSession } from "next-auth/react";

const UserClaimsPage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [claims, setClaims] = useState<UserClaim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    getUserClaims(userId)
      .then((data) => setClaims(data))
      .finally(() => setLoading(false));
  }, [userId]);

  if (!userId)
    return (
      <div className="py-10 text-center">Please login to see your claims.</div>
    );
  if (loading)
    return <div className="py-10 text-center">Loading your claims...</div>;
  if (claims.length === 0)
    return <div className="py-10 text-center">No claims submitted.</div>;

  return <UserClaimTracker userId={userId} />;
};

export default UserClaimsPage;
