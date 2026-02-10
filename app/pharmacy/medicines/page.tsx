import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

import { getPharmacyProfile } from "@/features/panel/pharmacies/actions";
import { PharmacyShell, PharmacyHeader } from "@/features/panel/pharmacies/components/layout";

export default async function MedicinesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const profile = await getPharmacyProfile(userId);

  if (!profile) {
    redirect("/panel/pharmacy/onboarding");
  }

  if (profile.status !== "APPROVED") {
    redirect("/panel/pharmacy");
  }

  return (
    <PharmacyShell>
      <PharmacyHeader title="Medicines" userName={profile.ownerName} />
      <div className="p-6">Medicines screen yahan aayegi</div>
    </PharmacyShell>
  );
}
