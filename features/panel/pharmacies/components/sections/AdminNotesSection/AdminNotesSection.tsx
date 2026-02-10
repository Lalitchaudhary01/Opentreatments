import { BaseCard } from "../../cards";

interface Props {
  notes?: string | null;
}

export function AdminNotesSection({ notes }: Props) {
  if (!notes) return null;

  return (
    <div className="p-6">
      <BaseCard title="Admin Notes">
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {notes}
        </p>
      </BaseCard>
    </div>
  );
}
