"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getInsuranceProfile } from "@/features/insurance-company-profile/actions/getInsuranceProfile";
import { updateInsuranceProfile } from "@/features/insurance-company-profile/actions/updateInsuranceProfile";
import InsuranceProfileForm from "@/features/insurance-company-profile/components/InsuranceProfileForm";
import {
  InsuranceProfile,
  InsuranceStatus,
} from "@/features/insurance-company-profile/types/insuranceProfile";

export default function EditProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<InsuranceProfile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!session?.user?.id) return;
      const data = await getInsuranceProfile(session.user.id);
      setProfile(data);
    }
    fetchProfile();
  }, [session]);

  async function handleUpdate(data: any) {
    if (!profile || !session?.user?.id) return;
    try {
      if (profile.status !== InsuranceStatus.APPROVED) {
        alert("❌ Only approved profiles can be edited");
        return;
      }

      await updateInsuranceProfile({ userId: session.user.id, ...data });
      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  }

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Insurance Profile</h1>
      <InsuranceProfileForm onSubmit={handleUpdate} initialData={profile} />
    </div>
  );
}
