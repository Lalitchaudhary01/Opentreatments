"use client";
import { UserHospital } from "../types/userHospital";
import UserHospitalCard from "./UserHospitalCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, AlertCircle, Sparkles, Search } from "lucide-react";

type Props = {
  hospitals: UserHospital[];
};

export default function UserHospitalList({ hospitals }: Props) {
  if (hospitals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center space-y-6 max-w-md relative">
          {/* Animated Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl animate-float" />
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl animate-float-delayed" />
          </div>

          {/* Icon Container */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-full flex items-center justify-center border-4 border-cyan-100 dark:border-cyan-900 shadow-lg relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full blur-xl opacity-20 animate-pulse" />
            <Building2 className="w-12 h-12 text-cyan-600 dark:text-cyan-400 relative z-10" />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              No Hospitals Found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              We couldn't find any hospitals matching your search criteria. Try
              adjusting your filters or search terms.
            </p>
          </div>

          {/* Alert */}
          <Alert className="text-left border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-900/20 backdrop-blur-sm">
            <AlertCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            <AlertDescription className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              Try broadening your search or check back later for new listings.
            </AlertDescription>
          </Alert>

          {/* Search Suggestions */}
          <div className="pt-4 space-y-2">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Search Tips:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["All Locations", "Multi-Specialty", "Emergency Care"].map(
                (tip) => (
                  <span
                    key={tip}
                    className="px-3 py-1 text-xs font-medium bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-400"
                  >
                    {tip}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with count */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-teal-400/5 to-cyan-400/5 rounded-2xl blur-xl" />

        <div className="relative bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/40 dark:to-teal-900/40 rounded-xl">
                  <Building2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Available Hospitals
                </h2>
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 font-bold text-xs">
                  {hospitals.length}
                </span>
                {hospitals.length === 1 ? "hospital" : "hospitals"} found in
                your area
              </p>
            </div>

            {/* Stats Badge */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 border-2 border-cyan-200 dark:border-cyan-800 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Verified Facilities
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {hospitals.map((hospital, index) => (
          <div
            key={hospital.id}
            className="animate-fadeInUp"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            <UserHospitalCard hospital={hospital} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.2;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 8s ease-in-out 4s infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
