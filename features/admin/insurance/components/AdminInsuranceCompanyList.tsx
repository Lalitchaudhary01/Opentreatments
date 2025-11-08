"use client";

import { useEffect, useState } from "react";
import {
  AdminInsuranceCompany,
  AdminInsuranceCompanyStatus,
} from "../types/adminInsuranceCompany";
import { getInsuranceCompanies } from "../actions/getInsuranceCompanies";
import AdminInsuranceCompanyCard from "./AdminInsuranceCompanyCard";

export default function AdminInsuranceCompanyList() {
  const [companies, setCompanies] = useState<AdminInsuranceCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getInsuranceCompanies(); // optionally pass "PENDING"
        setCompanies(data);
      } catch (error) {
        console.error("❌ Error loading companies", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleStatusChange = (
    id: string,
    status: AdminInsuranceCompanyStatus
  ) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  if (loading) return <p className="text-center">Loading companies...</p>;
  if (companies.length === 0)
    return <p className="text-center text-gray-500">No companies found.</p>;

  return (
    <div className="space-y-4">
      {companies.map((company) => (
        <AdminInsuranceCompanyCard
          key={company.id}
          company={company}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}
