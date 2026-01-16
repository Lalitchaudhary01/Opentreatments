"use client";

import { useHospitalProfile } from "@/features/panel/hospital/hooks/useHospitalProfile";
import HospitalProfileView from "./HospitalProfileView";
import PendingView from "../status/PendingView";
import RejectedView from "../status/RejectedView";

export default function HospitalDashboard() {
  const { profile, loading } = useHospitalProfile();

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!profile) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">
          No hospital profile found. Please complete onboarding.
        </p>
      </div>
    );
  }

  if (profile.status === "PENDING") {
    return <PendingView />;
  }

  if (profile.status === "REJECTED") {
    return <RejectedView />;
  }

  // APPROVED
  return <HospitalProfileView hospital={profile} />;
}
