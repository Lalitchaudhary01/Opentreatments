"use client";

import { DoctorProfile } from "@/features/panel/doctor/types/doctor";
import { DollarSign, Users, Activity } from "lucide-react";
import SectionStatCard from "./ProfileStatCard";

export default function StatsSection({ profile }: { profile: DoctorProfile }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SectionStatCard
        label="Consultation Fee"
        value={`₹${profile.fees ?? "-"}`}
        icon={<DollarSign className="text-[#00C6D2] text-2xl" />}
      />

      <SectionStatCard
        label="Total Patients"
        value={`${profile.totalReviews}+`}
        icon={<Users className="text-[#00C6D2] text-2xl" />}
      />

      <SectionStatCard
        label="Success Rate"
        value={`${profile.rating > 4.5 ? "96" : "92"}%`}
        icon={<Activity className="text-[#00C6D2] text-2xl" />}
      />
    </div>
  );
}
