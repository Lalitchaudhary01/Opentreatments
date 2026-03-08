"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getPharmacyProfile } from "@/features/panel/pharmacy/pharmacy-profile/actions/getPharmacyProfile";
import { PharmacyProfileView } from "@/features/panel/pharmacy/pharmacy-profile/components/PharmacyProfileView";

type PharmacyProfile = NonNullable<Awaited<ReturnType<typeof getPharmacyProfile>>>;

export default function PharmacyProfileViewPage() {
  const [profile, setProfile] = useState<PharmacyProfile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const res = await getPharmacyProfile();
      setProfile(res);
    }

    fetchProfile();
  }, []);

  if (!profile) return <p className="p-6 text-[#CBD5E1]">Loading profile...</p>;

  return (
    <div className="space-y-4 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Store Profile</h1>
        {profile.status === "APPROVED" ? (
          <Link
            href="/pharmacy/profile/edit"
            className="rounded-lg border border-white/[0.12] px-4 py-2 text-sm font-medium text-[#CBD5E1] transition hover:bg-white/[0.06]"
          >
            Edit Profile
          </Link>
        ) : null}
      </div>
      <PharmacyProfileView profile={profile} />
    </div>
  );
}
