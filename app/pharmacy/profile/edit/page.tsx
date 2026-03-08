"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getPharmacyProfile } from "@/features/panel/pharmacy/pharmacy-profile/actions/getPharmacyProfile";
import { updatePharmacyProfile } from "@/features/panel/pharmacy/pharmacy-profile/actions/updatePharmacyProfile";
import { PharmacyProfileForm } from "@/features/panel/pharmacy/pharmacy-profile/components/PharmacyProfileForm";

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
      toast.success("Profile updated successfully");
      router.push("/pharmacy/profile/view");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    }
  }

  if (!profile) return <p className="p-6 text-[#CBD5E1]">Loading profile...</p>;

  if (profile.status !== "APPROVED") {
    return (
      <p className="p-6 text-red-400">
        Profile cannot be edited until approved by admin.
      </p>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <PharmacyProfileForm defaultValues={profile} onSubmit={handleSubmit} isEdit />
    </div>
  );
}
