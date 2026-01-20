import { PharmacyProfile } from "@/features/panel/pharmacy/types";
import { BaseCard } from "../../cards";

interface Props {
  profile: PharmacyProfile;
}

export function LicenseSection({ profile }: Props) {
  return (
    <div className="p-6">
      <BaseCard title="License & Compliance">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <InfoRow label="License Number" value={profile.licenseNumber} />
          <InfoRow label="GST Number" value={profile.gstNumber} />
          <InfoRow
            label="Registered At"
            value={new Date(profile.createdAt).toLocaleDateString()}
          />
          <InfoRow
            label="Last Updated"
            value={new Date(profile.updatedAt).toLocaleDateString()}
          />
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
