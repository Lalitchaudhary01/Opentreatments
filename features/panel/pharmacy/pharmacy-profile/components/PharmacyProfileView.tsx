"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PharmacyStatusBadge } from "./PharmacyStatusBadge";

interface PharmacyProfileViewProps {
  profile: {
    name: string;
    ownerName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    licenseNumber: string;
    gstNumber?: string;
    status: string;
  };
}

export function PharmacyProfileView({ profile }: PharmacyProfileViewProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{profile.name}</CardTitle>
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
          <strong>Address:</strong> {profile.address}, {profile.city},{" "}
          {profile.state}, {profile.country}
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
