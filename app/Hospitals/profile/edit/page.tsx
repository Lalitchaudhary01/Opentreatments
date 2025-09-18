
import { getHospitalProfile } from "@/features/panel/hospitals/hospital-profile/actions/getHospitalProfile";
import { HospitalProfileForm } from "@/features/panel/hospitals/hospital-profile/components/HospitalProfileForm";
import { redirect } from "next/navigation";

export default async function EditHospitalProfilePage() {
  const profile = await getHospitalProfile();

  if (!profile) {
    redirect("/hospital/profile/submit");
  }

  if (profile.status !== "APPROVED") {
    redirect("/hospital/profile/view");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Hospital Profile</h1>
      <HospitalProfileForm defaultValues={profile} isEdit={true} />
    </div>
  );
}
