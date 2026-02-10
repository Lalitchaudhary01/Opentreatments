import { ReactNode } from "react";
import { PharmacySidebar } from "./PharmacySidebar";

interface Props {
  children: ReactNode;
}

export function PharmacyShell({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <PharmacySidebar />
      <main className="flex-1 bg-background">{children}</main>
    </div>
  );
}
