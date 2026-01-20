import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

import { getPharmacyProfile } from "@/features/panel/pharmacies/actions";
import {
  PharmacyShell,
  PharmacyHeader,
} from "@/features/panel/pharmacies/components/layout";
import { InventoryClientView } from "@/features/panel/pharmacies/components/client/InventoryClientView";

export default async function InventoryPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const profile = await getPharmacyProfile(session.user.id);
  if (!profile) redirect("/panel/pharmacy/onboarding");
  if (profile.status !== "APPROVED") redirect("/panel/pharmacy");

  return (
    <PharmacyShell>
      <PharmacyHeader title="Inventory" userName={profile.ownerName} />
      <InventoryClientView pharmacyId={profile.id} />
    </PharmacyShell>
  );
}
