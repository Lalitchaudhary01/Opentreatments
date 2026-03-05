import { updateConsultationStatus } from "@/features/panel/doctor/appointments/actions";
import { UiAppointment } from "../../types";

function statusClasses(status: UiAppointment["statusLabel"]) {
  if (status === "Confirmed") return "bg-teal-500/15 text-teal-400";
  if (status === "In Progress") return "bg-blue-500/15 text-blue-400";
  if (status === "Waiting") return "bg-amber-500/15 text-amber-400";
  if (status === "Completed") return "bg-violet-500/15 text-violet-400";
  return "bg-red-500/15 text-red-400";
}

function bookingClasses(booking: UiAppointment["booking"]) {
  if (booking === "Online Booked") return "bg-blue-500/15 text-blue-400";
  if (booking === "Offline Booked") return "bg-teal-500/15 text-teal-400";
  return "bg-purple-500/15 text-purple-400";
}

export default function AppointmentsTable({
  appointments,
  todayCount,
  doctorName,
}: {
  appointments: UiAppointment[];
  todayCount: number;
  doctorName?: string | null;
}) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white transition-colors hover:border-slate-300 dark:border-white/[0.07] dark:bg-[#161f30] dark:hover:border-white/20">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
        <div>
          <h2 className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Appointments</h2>
          <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">{todayCount} today</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-slate-500 dark:border-white/[0.07] dark:bg-[#1b263b] dark:text-[#94A3B8]">
              <th className="px-[18px] py-[9px]">Patient</th>
              <th className="px-[18px] py-[9px]">Time</th>
              <th className="px-[18px] py-[9px]">Doctor</th>
              <th className="px-[18px] py-[9px]">Type</th>
              <th className="px-[18px] py-[9px]">Booking</th>
              <th className="px-[18px] py-[9px]">Status</th>
              <th className="px-[18px] py-[9px]" />
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-[18px] py-14 text-center text-[12.5px] text-slate-500 dark:text-[#94A3B8]">
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((item) => (
                <tr key={`${item.recordType}-${item.id}`} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50/70 dark:border-white/[0.07] dark:hover:bg-white/[0.02]">
                  <td className="px-[18px] py-[11px] align-middle">
                    <div className="flex items-center gap-[10px]">
                      <div className={`h-[30px] w-[30px] rounded-full flex items-center justify-center text-[10.5px] font-bold ${item.avatarBg} ${item.avatarText}`}>
                        {item.avatar}
                      </div>
                      <div>
                        <p className="text-[12.5px] font-medium text-slate-900 dark:text-slate-100">{item.patientName}</p>
                        <p className="text-[10.5px] text-slate-500 dark:text-[#94A3B8]">#{item.patientId}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-[18px] py-[11px] align-middle text-[12.5px] text-slate-600 dark:text-slate-300">{item.time}</td>
                  <td className="px-[18px] py-[11px] align-middle text-[12.5px] text-slate-600 dark:text-slate-300">Dr. {doctorName || "R. Iyer"}</td>
                  <td className="px-[18px] py-[11px] align-middle">
                    <span className={`inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium ${item.type === "Follow-up" ? "bg-teal-500/15 text-teal-400" : item.type === "Procedure" ? "bg-amber-500/15 text-amber-400" : "bg-blue-500/15 text-blue-400"}`}>
                      <span className="inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-current opacity-70" />
                      {item.type}
                    </span>
                  </td>

                  <td className="px-[18px] py-[11px] align-middle">
                    <span className={`inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium ${bookingClasses(item.booking)}`}>
                      <span className="inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-current opacity-70" />
                      {item.booking}
                    </span>
                  </td>

                  <td className="px-[18px] py-[11px] align-middle">
                    <span className={`inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium ${statusClasses(item.statusLabel)}`}>
                      <span className="inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-current opacity-70" />
                      {item.statusLabel}
                    </span>
                  </td>

                  <td className="px-[18px] py-[11px] align-middle">
                    <div className="flex items-center justify-end gap-2">
                      {item.recordType === "consultation" && item.statusLabel !== "Completed" ? (
                        <form
                          action={async () => {
                            "use server";
                            await updateConsultationStatus(item.id, "APPROVED");
                          }}
                        >
                          <button
                            type="submit"
                            className="rounded-lg border border-green-500/30 bg-green-500/12 px-[10px] py-1 text-[11px] font-medium text-green-400 hover:bg-green-500/20"
                          >
                            Done
                          </button>
                        </form>
                      ) : null}

                      <button className="rounded-lg border border-slate-200 px-[9px] py-[3px] text-[11px] text-slate-600 hover:bg-slate-100 dark:border-white/[0.07] dark:text-[#94A3B8] dark:hover:bg-white/[0.06]">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
