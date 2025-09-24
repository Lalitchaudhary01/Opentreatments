"use client";

import { useSession } from "next-auth/react";
import InsuranceProfileForm from "@/features/insurance-company-profile/components/InsuranceProfileForm";
import { submitInsuranceProfile } from "@/features/insurance-company-profile/actions/submitInsuranceProfile";

export default function SubmitProfilePage() {
  const { data: session } = useSession();

  async function handleSubmit(data: any) {
    try {
      if (!session?.user?.id) throw new Error("Unauthorized");

      await submitInsuranceProfile({
        ...data,
        userId: session.user.id,
      });

      alert("Profile submitted successfully ✅ (Pending approval)");
    } catch (err) {
      console.error(err);
      alert("Error submitting profile");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Submit Insurance Profile</h1>
      <InsuranceProfileForm onSubmit={handleSubmit} />
    </div>
  );
}
