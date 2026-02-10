"use client";

import { HospitalStatCard } from "@/features/panel/hospital/components/cards";
import { HospitalStatusBadge } from "@/features/panel/hospital/components/ui/badges";
import { HospitalProfile } from "@/features/panel/hospital/types";

interface OverviewSectionProps {
  hospital?: HospitalProfile | null;
  stats?: {
    doctors?: number;
    services?: number;
    facilities?: number;
    procedures?: number;
    insurances?: number;
    estimates?: number;
  };
}

export default function OverviewSection({
  hospital,
  stats = {},
}: OverviewSectionProps) {
  // 🔐 Guard – jab data abhi nahi aaya
  if (!hospital) {
    return (
      <div className="rounded-xl border p-6 bg-muted/20">
        <p className="text-sm text-muted-foreground">Loading hospital…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{hospital.name}</h1>
          {(hospital.city || hospital.state) && (
            <p className="text-sm text-muted-foreground">
              {[hospital.city, hospital.state].filter(Boolean).join(", ")}
            </p>
          )}
        </div>

        <HospitalStatusBadge status={hospital.status} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <HospitalStatCard label="Doctors" value={stats.doctors ?? 0} />
        <HospitalStatCard label="Services" value={stats.services ?? 0} />
        <HospitalStatCard label="Facilities" value={stats.facilities ?? 0} />
        <HospitalStatCard label="Procedures" value={stats.procedures ?? 0} />
        <HospitalStatCard label="Insurance" value={stats.insurances ?? 0} />
        <HospitalStatCard label="Estimates" value={stats.estimates ?? 0} />
      </div>

      {/* Info */}
      <div className="rounded-xl border p-4 space-y-2">
        <p className="text-sm">
          <strong>Address:</strong>{" "}
          {[hospital.address, hospital.city, hospital.state, hospital.country]
            .filter(Boolean)
            .join(", ") || "—"}
        </p>

        {hospital.phone && (
          <p className="text-sm">
            <strong>Phone:</strong> {hospital.phone}
          </p>
        )}

        {hospital.email && (
          <p className="text-sm">
            <strong>Email:</strong> {hospital.email}
          </p>
        )}

        {hospital.website && (
          <p className="text-sm">
            <strong>Website:</strong> {hospital.website}
          </p>
        )}
      </div>
    </div>
  );
}
