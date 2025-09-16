
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getDoctorProfile } from "@/features/panel/doctors/actions/getDoctorProfile";
import DoctorProfileForm from "@/features/panel/doctors/components/DoctorProfileForm";


export default async function EditDoctorProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "DOCTOR") {
    return <p className="text-red-600">Unauthorized: Doctors only</p>;
  }

  const profile = await getDoctorProfile(session.user.id);

  if (!profile) {
    return <p className="text-red-600">No profile found to edit.</p>;
  }

  if (profile.status !== "APPROVED") {
    return <p className="text-yellow-600">You can only edit after approval.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <DoctorProfileForm initialData={profile} />
    </div>
  );
}
