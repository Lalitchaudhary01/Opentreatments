"use client";

import {
  AdminInsuranceCompany,
  AdminInsuranceCompanyStatus,
} from "../types/adminInsuranceCompany";
import { updateInsuranceCompanyStatus } from "../actions/updateInsuranceCompanyStatus";
import { useTransition } from "react";

type Props = {
  company: AdminInsuranceCompany;
  onStatusChange?: (id: string, status: AdminInsuranceCompanyStatus) => void;
};

export default function AdminInsuranceCompanyCard({
  company,
  onStatusChange,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleStatusUpdate = (status: AdminInsuranceCompanyStatus) => {
    startTransition(async () => {
      await updateInsuranceCompanyStatus(company.id, status);
      onStatusChange?.(company.id, status);
    });
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{company.name}</h3>
        {company.address && (
          <p className="text-sm text-gray-500">📍 {company.address}</p>
        )}
        {company.email && <p className="text-sm">📧 {company.email}</p>}
        {company.phone && <p className="text-sm">📞 {company.phone}</p>}
        {company.licenseNumber && (
          <p className="text-sm">🆔 Reg#: {company.licenseNumber}</p>
        )}
        {company.website && (
          <p className="text-sm">
            🔗{" "}
            <a
              className="text-blue-600 underline"
              href={company.website}
              target="_blank"
              rel="noreferrer"
            >
              {company.website}
            </a>
          </p>
        )}

        <p className="mt-2 text-xs">
          Status:{" "}
          <span
            className={`px-2 py-1 rounded ${
              company.status === "APPROVED"
                ? "bg-green-100 text-green-600"
                : company.status === "REJECTED"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {company.status}
          </span>
        </p>
      </div>

      <div className="flex gap-2">
        {company.status !== "APPROVED" && (
          <button
            onClick={() => handleStatusUpdate("APPROVED")}
            disabled={isPending}
            className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
          >
            Approve
          </button>
        )}
        {company.status !== "REJECTED" && (
          <button
            onClick={() => handleStatusUpdate("REJECTED")}
            disabled={isPending}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
          >
            Reject
          </button>
        )}
        <button
          onClick={() => handleStatusUpdate("PENDING")}
          disabled={isPending}
          className="px-3 py-1 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
