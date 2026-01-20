import { PharmacyProfile } from "@/features/panel/pharmacy/types";
import { PharmacyStatusBadge } from "../../ui/badges";
import { ActionButtons } from "./ActionButtons";

interface Props {
  profile: PharmacyProfile;
  onEdit?: () => void;
}

export function ProfileHeader({ profile, onEdit }: Props) {
  return (
    <div className="flex items-start justify-between gap-4 p-6 border-b">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <PharmacyStatusBadge status={profile.status} />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {profile.city}, {profile.state}
        </p>
      </div>

      <ActionButtons status={profile.status} onEdit={onEdit} />
    </div>
  );
}
