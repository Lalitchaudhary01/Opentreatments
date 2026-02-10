import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

import {
  PharmacyShell,
  PharmacyHeader,
} from "@/features/panel/pharmacies/components/layout";
import { ProfileClientView } from "@/features/panel/pharmacies/components/clients/ProfileClientView";

export default async function PharmacyProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  return (
    <PharmacyShell>
      <PharmacyHeader title="Profile" userName={session.user.name || ""} />
      <ProfileClientView userId={session.user.id} />
    </PharmacyShell>
  );
}
