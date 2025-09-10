"use client";

import { useEffect, useState } from "react";

import { DetailDrawer } from "@/features/medicines/components/DetailDrawer";
import { getMedicineBySlug } from "@/features/medicines/actions/getMedicinesBySlug";
import { MedicineDetail } from "@/features/medicines/types/medicine";

interface MedicineDetailPageProps {
  params: { slug: string };
}

export default function MedicineDetailPage({
  params,
}: MedicineDetailPageProps) {
  const [medicine, setMedicine] = useState<MedicineDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMedicineBySlug(params.slug);
        setMedicine(data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.slug]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!medicine) {
    return <div className="p-6">Medicine not found</div>;
  }

  return (
    <div className="p-6">
      <DetailDrawer open={true} onClose={() => {}} medicine={medicine} />
    </div>
  );
}
