import { ReactNode } from "react";
import { AvatarWithFallback } from "../ui/shared";

interface Props {
  title?: string;
  right?: ReactNode;
  userName?: string;
}

export function PharmacyHeader({ title, right, userName }: Props) {
  return (
    <header className="h-14 border-b px-6 flex items-center justify-between">
      <h1 className="text-base font-semibold">{title}</h1>

      <div className="flex items-center gap-3">
        {right}
        <AvatarWithFallback name={userName} />
      </div>
    </header>
  );
}
