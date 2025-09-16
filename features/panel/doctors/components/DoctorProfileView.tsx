"use client";

import DoctorStatusBadge from "./DoctorStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoctorProfile } from "../types/doctorProfile";

export default function DoctorProfileView({
  profile,
  isAdmin = false,
}: {
  profile: DoctorProfile;
  isAdmin?: boolean;
}) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{profile.name}</span>
          <DoctorStatusBadge status={profile.status} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong>Specialization:</strong> {profile.specialization}
        </p>
        <p>
          <strong>Specialties:</strong> {profile.specialties.join(", ")}
        </p>
        <p>
          <strong>Experience:</strong> {profile.experience ?? "N/A"} years
        </p>
        <p>
          <strong>Gender:</strong> {profile.gender ?? "N/A"}
        </p>
        <p>
          <strong>Fees:</strong> ₹{profile.fees ?? "N/A"}
        </p>
        <p>
          <strong>Languages:</strong> {profile.languages.join(", ")}
        </p>
        <p>
          <strong>City:</strong> {profile.city ?? "N/A"}
        </p>
        {profile.profilePic && (
          <img
            src={profile.profilePic}
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover"
          />
        )}
        {isAdmin && (
          <p className="text-sm text-gray-500">
            Admin View – can approve/reject this profile
          </p>
        )}
      </CardContent>
    </Card>
  );
}
