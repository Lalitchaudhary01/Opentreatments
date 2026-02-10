"use client";

import { DoctorProfile } from "@/features/panel/doctor/types";
import { MapPin, DollarSign, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClinicDetailsSection({
  profile,
}: {
  profile: DoctorProfile;
}) {
  return (
    <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#00C6D2]" />
          Clinic Details
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.city && (
            <InfoItem
              label="Practice City"
              value={profile.city}
              icon={<MapPin className="w-5 h-5 text-[#00C6D2]" />}
            />
          )}

          {typeof profile.fees === "number" && (
            <InfoItem
              label="Consultation Fees"
              value={`₹${profile.fees}`}
              icon={<DollarSign className="w-5 h-5 text-[#00C6D2]" />}
            />
          )}
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
  icon: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-xl bg-[#00C6D2]/5 border border-[#00C6D2]/20">
      <p className="text-xs font-semibold text-muted-foreground mb-2">
        {label}
      </p>
      <p className="text-lg font-bold flex items-center gap-2">
        {icon}
        {value}
      </p>
    </div>
  );
}
