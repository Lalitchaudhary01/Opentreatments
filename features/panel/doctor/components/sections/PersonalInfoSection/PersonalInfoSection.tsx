"use client";

import { DoctorProfile } from "@/features/panel/doctor/types";
import { User, MapPin, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function PersonalInfoSection({
  profile,
}: {
  profile: DoctorProfile;
}) {
  return (
    <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <User className="w-5 h-5 text-[#00C6D2]" />
          Personal Information
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex items-start gap-6">
          

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <InfoItem label="Full Name" value={`Dr. ${profile.name}`} />
            {profile.gender && (
              <InfoItem label="Gender" value={profile.gender} />
            )}
            {profile.city && (
              <InfoItem
                label="City"
                value={profile.city}
                icon={<MapPin className="w-4 h-4 text-[#00C6D2]" />}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="p-3 rounded-xl bg-[#00C6D2]/5 border border-[#00C6D2]/20">
      <p className="text-xs font-semibold text-muted-foreground mb-1">
        {label}
      </p>
      <p className="text-base font-bold flex items-center gap-2">
        {icon}
        {value}
      </p>
    </div>
  );
}
