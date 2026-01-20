import { PharmacyStatus } from "@prisma/client";

interface Props {
  status: PharmacyStatus;
  onEdit?: () => void;
}

export function ActionButtons({ status, onEdit }: Props) {
  if (status === "PENDING") {
    return (
      <button
        onClick={onEdit}
        className="px-3 py-2 text-sm rounded-lg border hover:bg-muted"
      >
        Edit Profile
      </button>
    );
  }

  if (status === "REJECTED") {
    return (
      <button
        onClick={onEdit}
        className="px-3 py-2 text-sm rounded-lg bg-destructive text-white"
      >
        Fix & Resubmit
      </button>
    );
  }

  return null;
}
