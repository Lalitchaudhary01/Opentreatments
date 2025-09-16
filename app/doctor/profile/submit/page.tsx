
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DoctorProfileForm from "@/features/panel/doctors/components/DoctorProfileForm";

export default async function SubmitDoctorProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "DOCTOR") {
    return <p className="text-red-600">Unauthorized: Doctors only</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Submit Your Profile</h1>
      <DoctorProfileForm />
    </div>
  );
}
