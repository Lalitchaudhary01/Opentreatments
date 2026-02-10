"use client";

import { DoctorProfile } from "@/features/panel/doctor/types/";
import { GraduationCap, Briefcase, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LanguageBadges from "./LanguageBadges";

export default function ProfessionalDetailsSection({
  profile,
}: {
  profile: DoctorProfile;
}) {
  return (
    <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#00C6D2]" />
          Professional Details
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {profile.experience && (
            <InfoBlock
              label="Experience"
              value={`${profile.experience} Years`}
              icon={<Briefcase className="w-5 h-5 text-[#00C6D2]" />}
            />
          )}

          {profile.gender && (
            <InfoBlock
              label="Gender"
              value={profile.gender}
              icon={<User className="w-5 h-5 text-[#00C6D2]" />}
            />
          )}
        </div>

        {profile.languages && profile.languages.length > 0 && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#00C6D2]/10 to-teal-500/10 border border-[#00C6D2]/20">
            <label className="text-sm font-semibold mb-3 flex items-center gap-2">
              Languages Spoken
            </label>
            <LanguageBadges languages={profile.languages} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function InfoBlock({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-xl bg-[#00C6D2]/5 border border-[#00C6D2]/20">
      <p className="text-xs font-semibold text-muted-foreground mb-2">
        {label}
      </p>
      <p className="text-2xl font-bold text-[#00C6D2] flex items-center gap-2">
        {icon}
        {value}
      </p>
    </div>
  );
}
