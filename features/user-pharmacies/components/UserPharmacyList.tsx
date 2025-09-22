"use client";

import { useEffect, useState } from "react";
import { getApprovedPharmacies } from "../actions/getApprovedPharmacies";
import { UserPharmacy } from "../types/userPharmacy";
import UserPharmacyCard from "./UserPharmacyCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserPharmacyList() {
  const [pharmacies, setPharmacies] = useState<UserPharmacy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPharmacies() {
      setLoading(true);
      const data = await getApprovedPharmacies();
      setPharmacies(data);
      setLoading(false);
    }
    fetchPharmacies();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pharmacies.map((pharmacy) => (
        <UserPharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
      ))}
    </div>
  );
}
