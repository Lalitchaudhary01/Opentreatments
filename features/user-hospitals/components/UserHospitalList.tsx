"use client";
import { UserHospital } from "../types/userHospital";
import UserHospitalCard from "./UserHospitalCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, AlertCircle } from "lucide-react";

type Props = {
  hospitals: UserHospital[];
};

export default function UserHospitalList({ hospitals }: Props) {
  if (hospitals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Building2 className="w-8 h-8 text-gray-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              No Hospitals Found
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              There are currently no hospitals available in your area. Please
              try adjusting your search criteria or check back later.
            </p>
          </div>
          <Alert className="text-left">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              If you believe this is an error, please contact support for
              assistance.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with count */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-gray-900">
            Available Hospitals
          </h2>
          <p className="text-sm text-gray-500">
            {hospitals.length} hospital{hospitals.length !== 1 ? "s" : ""} found
            in your area
          </p>
        </div>
      </div>

      {/* Hospital Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <UserHospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </div>
    </div>
  );
}
