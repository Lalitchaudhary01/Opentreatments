"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PharmacyProfileForm } from "@/features/pharmacy-profile/components/PharmacyProfileForm";
import { getPharmacyProfile } from "@/features/pharmacy-profile/actions/getPharmacyProfile";
import { updatePharmacyProfile } from "@/features/pharmacy-profile/actions/updatePharmacyProfile";

export default function EditPharmacyProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      const res = await getPharmacyProfile();
      setProfile(res);
    }
    fetchProfile();
  }, []);

  async function handleSubmit(values: any) {
    try {
      await updatePharmacyProfile(values);
      toast.success("Profile updated successfully!");
      router.push("/pharmacy/profile/view");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    }
  }

  if (!profile) return <p className="text-center py-6">Loading profile...</p>;

  if (profile.status !== "APPROVED") {
    return (
      <p className="text-center py-6 text-red-600">
        Profile cannot be edited until approved by admin.
      </p>
    );
  }

  return (
    <PharmacyProfileForm
      defaultValues={profile}
      onSubmit={handleSubmit}
      isEdit
    />
  );
}
