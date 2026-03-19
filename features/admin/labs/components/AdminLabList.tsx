"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getLabs } from "../actions/getLabs";
import { AdminLab, LabStatus } from "../types/adminLab";
import AdminLabCard from "./AdminLabCard";

export default function AdminLabList() {
  const [labs, setLabs] = useState<AdminLab[]>([]);
  const [statusFilter, setStatusFilter] = useState<LabStatus | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getLabs(statusFilter);
      setLabs(data);
    } catch (err: any) {
      alert(err.message || "Failed to fetch laboratories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        <Button variant={statusFilter === undefined ? "default" : "outline"} onClick={() => setStatusFilter(undefined)}>
          All
        </Button>
        <Button variant={statusFilter === "PENDING" ? "default" : "outline"} onClick={() => setStatusFilter("PENDING")}>
          Pending
        </Button>
        <Button variant={statusFilter === "APPROVED" ? "default" : "outline"} onClick={() => setStatusFilter("APPROVED")}>
          Approved
        </Button>
        <Button variant={statusFilter === "REJECTED" ? "default" : "outline"} onClick={() => setStatusFilter("REJECTED")}>
          Rejected
        </Button>
        <Button variant={statusFilter === "SUSPENDED" ? "default" : "outline"} onClick={() => setStatusFilter("SUSPENDED")}>
          Suspended
        </Button>
      </div>

      {loading ? (
        <p>Loading laboratories...</p>
      ) : labs.length === 0 ? (
        <p>No laboratories found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {labs.map((lab) => (
            <AdminLabCard key={lab.id} lab={lab} refresh={fetchData} />
          ))}
        </div>
      )}
    </div>
  );
}
