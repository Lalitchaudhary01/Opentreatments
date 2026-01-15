"use client";

import { DoctorProfile } from "@/features/panel/doctor/types/doctor";
import { AvatarWithFallback } from "../../ui/shared";
import DoctorStatusBadge from "../../ui/badges/DoctorStatusBadge";
import { Stethoscope, Star, MapPin, Briefcase } from "lucide-react";
import ActionButtons from "./ActionButtons";

export default function ProfileHeader({ profile }: { profile: DoctorProfile }) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-8">
      <AvatarWithFallback
        src={profile.profilePic}
        name={profile.name}
        className="w-40 h-40 border-4 border-white shadow-lg"
      />

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-3xl font-bold">Dr. {profile.name}</h2>
            <p className="text-lg text-[#00C6D2] font-semibold mt-1 flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              {profile.specialization}
            </p>
          </div>

          <DoctorStatusBadge status={profile.status} />
        </div>

        <div className="flex flex-wrap gap-6 text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-lg text-foreground">
              {profile.rating}
            </span>
            <span className="text-sm">({profile.totalReviews} reviews)</span>
          </div>

          {profile.city && (
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{profile.city}</span>
            </div>
          )}

          {profile.experience && (
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span>{profile.experience} years</span>
            </div>
          )}
        </div>

        <ActionButtons />
      </div>
    </div>
  );
}
