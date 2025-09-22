"use client";

import { useEffect, useState } from "react";
import { getPharmacies } from "../actions/getPharmacies";
import { AdminPharmacy, PharmacyStatus } from "../types/adminPharmacy";
import AdminPharmacyCard from "./AdminPharmacyCard";
import { Button } from "@/components/ui/button";

export default function AdminPharmacyList() {
  const [pharmacies, setPharmacies] = useState<AdminPharmacy[]>([]);
  const [statusFilter, setStatusFilter] = useState<PharmacyStatus | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPharmacies(statusFilter);
      setPharmacies(data);
    } catch (err: any) {
      alert(err.message || "Failed to fetch pharmacies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button
          variant={statusFilter === undefined ? "default" : "outline"}
          onClick={() => setStatusFilter(undefined)}
        >
          All
        </Button>
        <Button
          variant={statusFilter === "PENDING" ? "default" : "outline"}
          onClick={() => setStatusFilter("PENDING")}
        >
          Pending
        </Button>
        <Button
          variant={statusFilter === "APPROVED" ? "default" : "outline"}
          onClick={() => setStatusFilter("APPROVED")}
        >
          Approved
        </Button>
        <Button
          variant={statusFilter === "REJECTED" ? "default" : "outline"}
          onClick={() => setStatusFilter("REJECTED")}
        >
          Rejected
        </Button>
      </div>

      {loading ? (
        <p>Loading pharmacies...</p>
      ) : pharmacies.length === 0 ? (
        <p>No pharmacies found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pharmacies.map((pharmacy) => (
            <AdminPharmacyCard
              key={pharmacy.id}
              pharmacy={pharmacy}
              refresh={fetchData}
            />
          ))}
        </div>
      )}
    </div>
  );
}
