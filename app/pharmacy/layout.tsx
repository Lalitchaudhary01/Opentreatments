import { PharmacyShell } from "@/features/panel/pharmacy/components"

export default function PharmaciesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PharmacyShell>
      {children}
    </PharmacyShell>
  )
}