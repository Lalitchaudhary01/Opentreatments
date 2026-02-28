import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { DoctorSettingsScreen } from "@/features/panel/doctor/settings";

export default async function DoctorSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  return (
    <DoctorSettingsScreen
      user={{
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      }}
    />
  );
}
