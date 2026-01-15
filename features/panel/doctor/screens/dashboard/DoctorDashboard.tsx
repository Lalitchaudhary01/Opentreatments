"use client";

import { useDoctorProfile } from "@/features/panel/doctor/hooks/useDoctorProfile";
import DoctorProfileView from "./DoctorProfileView";
import { HeaderSkeleton, SidebarSkeleton } from "../../components/ui/skeletons";

export default function DoctorDashboard() {
  const { profile, loading, error } = useDoctorProfile();

  if (loading) {
    return (
      <div className="flex h-screen">
        <SidebarSkeleton />
        <div className="flex-1">
          <HeaderSkeleton />
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load doctor profile.
      </div>
    );
  }

  return <DoctorProfileView profile={profile} />;
}
