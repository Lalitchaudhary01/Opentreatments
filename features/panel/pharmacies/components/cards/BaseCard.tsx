import { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
}

export function BaseCard({ title, children }: Props) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      {title && <h3 className="mb-3 text-sm font-medium">{title}</h3>}
      {children}
    </div>
  );
}
