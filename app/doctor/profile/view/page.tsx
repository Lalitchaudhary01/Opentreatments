import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

import Link from "next/link";
import { getDoctorProfile } from "@/features/panel/doctors/actions/getDoctorProfile";
import DoctorProfileView from "@/features/panel/doctors/components/DoctorProfileView";

export default async function ViewDoctorProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "DOCTOR") {
    return <p className="text-red-600">Unauthorized: Doctors only</p>;
  }

  const profile = await getDoctorProfile();

  if (!profile) {
    return (
      <div className="p-6">
        <p>
          No profile found. Please{" "}
          <Link href="/doctor/profile/submit" className="text-blue-600">
            create one
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      <DoctorProfileView profile={profile} />
      
    </div>
  );
}
