// app/doctor/consultations/page.tsx
import { getConsultationsForDoctor } from "../actions";
import { ConsultationList } from "../components";
import { CalendarDays, Plus } from "lucide-react";

export default async function AllConsultations() {
  const consultations = await getConsultationsForDoctor();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <CalendarDays className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Appointments
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Manage and track all patient appointments
              </p>
            </div>
          </div>
          
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-600/20">
            <Plus className="w-5 h-5" />
            New Appointment
          </button>
        </div>

        {/* Filter Chips - Exactly like screenshot */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {[
            { name: "All", count: 12 },
            { name: "Confirmed", count: 8 },
            { name: "In Progress", count: 1 },
            { name: "Waiting", count: 2 },
            { name: "Completed", count: 1 },
          ].map((filter) => (
            <button
              key={filter.name}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all
                ${
                  filter.name === "All"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                }`}
            >
              {filter.name}
              {filter.count > 0 && (
                <span
                  className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                    filter.name === "All"
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {filter.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Appointments count - Exactly like screenshot */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Appointments
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            12 appointments
          </span>
        </div>

        {/* Table Headers - Exactly like screenshot */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-100 dark:bg-gray-800 rounded-t-xl">
          <div className="col-span-3">PATIENT</div>
          <div className="col-span-2">TIME</div>
          <div className="col-span-2">SERVICE</div>
          <div className="col-span-2">STATUS</div>
          <div className="col-span-3">ACTION</div>
        </div>

        <ConsultationList consultations={consultations} />
      </div>
    </div>
  );
}