"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PharmacyProfileForm } from "@/features/pharmacy-profile/components/PharmacyProfileForm";
import { submitPharmacyProfile } from "@/features/pharmacy-profile/actions/submitPharmacyProfile";

export default function SubmitPharmacyProfilePage() {
  const router = useRouter();

  async function handleSubmit(values: any) {
    try {
      await submitPharmacyProfile(values);
      toast.success("Profile submitted successfully! Awaiting admin approval.");
      router.push("/pharmacy/profile/view");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit profile");
    }
  }

  return <PharmacyProfileForm onSubmit={handleSubmit} />;
}
