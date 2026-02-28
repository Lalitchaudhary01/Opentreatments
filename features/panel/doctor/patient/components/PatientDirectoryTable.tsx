"use client";

import { useMemo, useState } from "react";
import PatientDetailsModal, { PatientModalData } from "./PatientDetailsModal";

export type DirectoryPatient = {
  id: string;
  type: "online" | "offline";
  displayName: string;
  phoneNumber?: string;
  city: string;
  lastVisit: string;
  sortTime: number;
  visits: number;
  bloodGroup: string;
  status: "Active" | "New";
  avatar: string;
  patientId: string;
  gender: "Male" | "Female";
  dob: string;
  avatarBg: string;
  avatarText: string;
};

export default function PatientDirectoryTable({
  patients,
}: {
  patients: DirectoryPatient[];
}) {
  const [selectedPatient, setSelectedPatient] = useState<PatientModalData | null>(null);

  const bloodClass = useMemo<Record<string, string>>(
    () => ({
      "O+": "bg-red-500/15 text-red-400",
      "O-": "bg-red-500/15 text-red-400",
      "A+": "bg-blue-500/15 text-blue-400",
      "A-": "bg-blue-500/15 text-blue-400",
      "B+": "bg-rose-500/15 text-rose-400",
      "B-": "bg-rose-500/15 text-rose-400",
      "AB+": "bg-violet-500/15 text-violet-400",
      "AB-": "bg-violet-500/15 text-violet-400",
    }),
    []
  );

  return (
    <>
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161f30] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-left text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#1b263b]">
                <th className="px-4 py-3 font-semibold">Patient</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">City</th>
                <th className="px-4 py-3 font-semibold">Last Visit</th>
                <th className="px-4 py-3 font-semibold">Visits</th>
                <th className="px-4 py-3 font-semibold">Blood</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold" />
              </tr>
            </thead>

            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-14 text-center text-slate-500 dark:text-slate-400">
                    No patients found
                  </td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-slate-200 dark:border-white/10 last:border-b-0 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer"
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
                        gender: p.gender,
                        dob: p.dob,
                      })
                    }
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold ${p.avatarBg} ${p.avatarText}`}>
                          {p.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{p.displayName}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">#{p.patientId}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">{p.phoneNumber || "+91 98765 43210"}</td>
                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">{p.city}</td>
                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">{p.lastVisit}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-900 dark:text-slate-100">{p.visits}</td>

                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${bloodClass[p.bloodGroup] || bloodClass["O+"]}`}>
                        {p.bloodGroup}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          p.status === "New"
                            ? "bg-blue-500/15 text-blue-400"
                            : "bg-green-500/15 text-green-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            p.status === "New" ? "bg-blue-400" : "bg-green-400"
                          }`}
                        />
                        {p.status}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <button
                        className="h-7 px-3 rounded-lg text-xs border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
                        onClick={(e) => {
                          e.stopPropagation();
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
                            gender: p.gender,
                            dob: p.dob,
                          });
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PatientDetailsModal
        open={Boolean(selectedPatient)}
        patient={selectedPatient}
        onClose={() => setSelectedPatient(null)}
      />
    </>
  );
}
