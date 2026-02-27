"use client";

import { useMemo, useState } from "react";
import { Eye } from "lucide-react";
import PatientDetailsModal, { PatientModalData } from "./PatientDetailsModal";

export type DirectoryPatient = {
  id: string;
  type: string;
  displayName: string;
  phoneNumber?: string;
  city: string;
  lastVisit: string;
  visits: number;
  bloodGroup: string;
  status: "Active" | "New" | string;
  avatar: string;
  patientId: string;
};

export default function PatientDirectoryTable({
  patients,
}: {
  patients: DirectoryPatient[];
}) {
  const [selectedPatient, setSelectedPatient] = useState<PatientModalData | null>(null);

  const bloodColors = useMemo<Record<string, string>>(
    () => ({
      "O+": "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
      "O-": "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
      "A+": "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
      "A-": "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
      "B+": "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
      "B-": "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
      "AB+": "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
      "AB-": "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
    }),
    []
  );

  return (
    <>
      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-100 dark:bg-gray-800 rounded-t-xl border-b border-gray-200 dark:border-gray-700">
        <div className="col-span-3">PATIENT</div>
        <div className="col-span-2">PHONE</div>
        <div className="col-span-1">CITY</div>
        <div className="col-span-1">LAST VISIT</div>
        <div className="col-span-1">VISITS</div>
        <div className="col-span-1">BLOOD</div>
        <div className="col-span-1">STATUS</div>
        <div className="col-span-2">ACTION</div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-b-xl border border-t-0 border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
        {patients.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">No patients found</p>
          </div>
        ) : (
          patients.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="col-span-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        p.type === "online"
                          ? "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400"
                          : "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400"
                      }`}
                    >
                      <span className="text-sm font-bold">{p.avatar}</span>
                    </div>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                        p.type === "online" ? "bg-blue-500" : "bg-green-500"
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {p.displayName}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{p.patientId}</p>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                  {p.phoneNumber || "+91 98765 43210"}
                </span>
              </div>

              <div className="col-span-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">{p.city}</span>
              </div>

              <div className="col-span-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">{p.lastVisit}</span>
              </div>

              <div className="col-span-1">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{p.visits}</span>
              </div>

              <div className="col-span-1">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                    bloodColors[p.bloodGroup] || bloodColors["O+"]
                  }`}
                >
                  {p.bloodGroup}
                </span>
              </div>

              <div className="col-span-1">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${
                    p.status === "New"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                      : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      p.status === "New" ? "bg-blue-500" : "bg-green-500"
                    }`}
                  />
                  {p.status}
                </span>
              </div>

              <div className="col-span-2">
                <button
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                  onClick={() =>
                    setSelectedPatient({
                      id: p.id,
                      displayName: p.displayName,
                      patientId: p.patientId,
                      visits: p.visits,
                      phoneNumber: p.phoneNumber || "+91 98765 43210",
                      city: p.city,
                      lastVisit: p.lastVisit,
                      bloodGroup: p.bloodGroup,
                      status: p.status,
                      avatar: p.avatar,
                      gender: "Female",
                      dob: "12 Mar 1988",
                    })
                  }
                >
                  <Eye className="w-3.5 h-3.5" />
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <PatientDetailsModal
        open={Boolean(selectedPatient)}
        patient={selectedPatient}
        onClose={() => setSelectedPatient(null)}
      />
    </>
  );
}
