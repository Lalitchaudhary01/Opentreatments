// app/admin/hospitals/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import HospitalTable from "@/features/admin/hospitals/components/HopitalTable";

export default function HospitalsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hospitals</h1>
        <Link href="/admin/hospitals/add">
          <Button>Add Hospital</Button>
        </Link>
      </div>
      <HospitalTable />
    </div>
  );
}
