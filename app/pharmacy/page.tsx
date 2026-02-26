import { redirect } from "next/navigation"

export default function PharmaciesRootPage() {
  redirect("/pharmacies/dashboard")
}