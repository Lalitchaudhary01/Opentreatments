import { DoctorProfileScreen } from "@/features/panel/doctor/profile";
import { getDoctorProfileView } from "@/features/panel/doctor/profile/actions/getDoctorProfileView";

export default async function DoctorProfilePage() {
  const doctor = await getDoctorProfileView();

  if (!doctor) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold">Profile not found</h2>
        <p className="text-muted-foreground">Please complete your onboarding first.</p>
      </div>
    );
  }

  return <DoctorProfileScreen profile={doctor} />;
}
