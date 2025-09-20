"use client";

import { submitPharmacyProfile } from "@/features/panel/pharmacy/pharmacy-profile/actions/submitPharmacyProfile";
import { PharmacyProfileForm } from "@/features/panel/pharmacy/pharmacy-profile/components/PharmacyProfileForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


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
