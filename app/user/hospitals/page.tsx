"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserHospital } from "@/features/user-hospitals/types/userHospital";
import { getApprovedHospitals } from "@/features/user-hospitals/actions/getApprovedHospitals";
import UserHospitalList from "@/features/user-hospitals/components/UserHospitalList";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function UserHospitalsPage() {
  const [hospitals, setHospitals] = useState<UserHospital[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getApprovedHospitals();
        setHospitals(data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>

          {/* Cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <div className="flex flex-wrap gap-1">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-14" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex flex-wrap gap-1">
                      <Skeleton className="h-6 w-18" />
                      <Skeleton className="h-6 w-22" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <UserHospitalList
        hospitals={hospitals}
        onHospitalClick={(hospital) =>
          router.push(`/user/hospitals/${hospital.id}`)
        }
      />
    </div>
  );
}
