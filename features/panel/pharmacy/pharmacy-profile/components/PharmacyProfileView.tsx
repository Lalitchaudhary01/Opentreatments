"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PharmacyStatusBadge } from "./PharmacyStatusBadge";

interface PharmacyProfileViewProps {
  profile: {
    name: string;
    ownerName: string;
    email: string;
    phone: string;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    licenseNumber: string;
    gstNumber?: string | null;
    status: "PENDING" | "APPROVED" | "REJECTED";
  };
}

export function PharmacyProfileView({ profile }: PharmacyProfileViewProps) {
  return (
    <Card className="mx-auto max-w-2xl border-white/[0.08] bg-[#111827] text-[#E2E8F0]">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-white">{profile.name}</CardTitle>
        <PharmacyStatusBadge status={profile.status} />
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <p>
          <strong>Owner:</strong> {profile.ownerName}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Phone:</strong> {profile.phone}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {[profile.address, profile.city, profile.state, profile.country].filter(Boolean).join(", ") || "Not added"}
        </p>
        <p>
          <strong>License:</strong> {profile.licenseNumber}
        </p>
        {profile.gstNumber && (
          <p>
            <strong>GST:</strong> {profile.gstNumber}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
