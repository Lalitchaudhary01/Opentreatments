// import { PharmacyProfile } from "@/features/panel/pharmacy/types";
import { PharmacyProfile } from "../../../types";
import { BaseCard } from "../../cards";

interface Props {
  profile: PharmacyProfile;
}

export function PharmacyInfoSection({ profile }: Props) {
  return (
    <div className="p-6">
      <BaseCard title="Pharmacy Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <InfoRow label="Owner" value={profile.ownerName} />
          <InfoRow label="Phone" value={profile.phone} />
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Address" value={profile.address} />
          <InfoRow label="City" value={profile.city} />
          <InfoRow label="State" value={profile.state} />
          <InfoRow label="Country" value={profile.country} />
        </div>
      </BaseCard>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-medium">{value || "—"}</span>
    </div>
  );
}
