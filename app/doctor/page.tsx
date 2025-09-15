import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DoctorLogoutButton from "@/components/layout/DoctorLogoutButton";

export default async function DoctorPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "DOCTOR") {
    return (
      <p className="text-red-600">
        Unauthorized: Only doctors can access this page.
      </p>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome Doctor {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
      <p>Phone: {session.user.phone}</p>

      {/* 🔹 Logout Button */}
      <DoctorLogoutButton />
    </div>
  );
}
