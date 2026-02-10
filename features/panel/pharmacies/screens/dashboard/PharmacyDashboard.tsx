"use client";

import { PharmacyShell, PharmacyHeader } from "../../components/layout";
import {
  ProfileHeader,
  StatsSection,
  PharmacyInfoSection,
  LicenseSection,
  InventorySection,
  AvailabilitySection,
  AdminNotesSection,
} from "../../components/sections";

export function PharmacyDashboard({
  profile,
  inventory,
}: {
  profile: any;
  inventory: any[];
}) {
  return (
    <PharmacyShell>
      <PharmacyHeader title="Dashboard" userName={profile.ownerName} />

      <ProfileHeader profile={profile} />
      <StatsSection
        totalMedicines={inventory.length}
        totalStock={inventory.reduce((a, b) => a + b.quantity, 0)}
        expiringSoon={0}
        lowStock={0}
      />

      <PharmacyInfoSection profile={profile} />
      <LicenseSection profile={profile} />
      <InventorySection items={inventory} />
      <AvailabilitySection isOpen />
      <AdminNotesSection notes={profile.adminNotes} />
    </PharmacyShell>
  );
}
