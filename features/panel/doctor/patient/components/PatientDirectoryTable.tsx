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
  registeredCount,
}: {
  patients: DirectoryPatient[];
  registeredCount: number;
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
      <div className="overflow-hidden rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] transition-colors hover:border-slate-300 dark:hover:border-white/20">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.07] px-5 py-[15px]">
          <div>
            <h2 className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Patient Directory</h2>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">{registeredCount.toLocaleString("en-IN")} registered</p>
          </div>
          <button className="text-[12px] font-medium text-blue-400 hover:text-blue-300">Export CSV →</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-slate-500 dark:text-[#94A3B8]">
                <th className="px-[18px] py-[9px]">Patient</th>
                <th className="px-[18px] py-[9px]">Phone</th>
                <th className="px-[18px] py-[9px]">City</th>
                <th className="px-[18px] py-[9px]">Last Visit</th>
                <th className="px-[18px] py-[9px]">Visits</th>
                <th className="px-[18px] py-[9px]">Blood</th>
                <th className="px-[18px] py-[9px]">Status</th>
                <th className="px-[18px] py-[9px]" />
              </tr>
            </thead>

            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-[18px] py-14 text-center text-[12.5px] text-slate-500 dark:text-[#94A3B8]">
                    No patients found
                  </td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr
                    key={p.id}
                    className="cursor-pointer border-b border-slate-200 dark:border-white/[0.07] last:border-b-0 hover:bg-slate-50/70 dark:hover:bg-white/[0.02]"
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
                    <td className="px-[18px] py-[11px] align-middle">
                      <div className="flex items-center gap-[10px]">
                        <div className={`h-[30px] w-[30px] rounded-full flex items-center justify-center text-[10.5px] font-bold ${p.avatarBg} ${p.avatarText}`}>
                          {p.avatar}
                        </div>
                        <div>
                          <p className="text-[12.5px] font-medium text-slate-900 dark:text-slate-100">{p.displayName}</p>
                          <p className="text-[10.5px] text-slate-500 dark:text-[#94A3B8]">#{p.patientId}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-[18px] py-[11px] align-middle text-[12.5px] text-slate-600 dark:text-slate-300">{p.phoneNumber || "+91 98765 43210"}</td>
                    <td className="px-[18px] py-[11px] align-middle text-[12.5px] text-slate-600 dark:text-slate-300">{p.city}</td>
                    <td className="px-[18px] py-[11px] align-middle text-[12.5px] text-slate-600 dark:text-slate-300">{p.lastVisit}</td>
                    <td className="px-[18px] py-[11px] align-middle text-[12.5px] font-semibold text-slate-900 dark:text-slate-100">{p.visits}</td>

                    <td className="px-[18px] py-[11px] align-middle">
                      <span className={`inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium ${bloodClass[p.bloodGroup] || bloodClass["O+"]}`}>
                        <span className="inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-current opacity-70" />
                        {p.bloodGroup}
                      </span>
                    </td>

                    <td className="px-[18px] py-[11px] align-middle">
                      <span
                        className={`inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium ${
                          p.status === "New"
                            ? "bg-blue-500/15 text-blue-400"
                            : "bg-green-500/15 text-green-400"
                        }`}
                      >
                        <span
                          className={`h-[5px] w-[5px] rounded-full ${
                            p.status === "New" ? "bg-blue-400" : "bg-green-400"
                          }`}
                        />
                        {p.status}
                      </span>
                    </td>

                    <td className="px-[18px] py-[11px] align-middle">
                      <button
                        className="rounded-lg border border-slate-200 dark:border-white/[0.07] px-[9px] py-[3px] text-[11px] text-slate-600 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-white/[0.06]"
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
