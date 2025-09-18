"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserHospital } from "@/features/user-hospitals/types/userHospital";
import { getApprovedHospitals } from "@/features/user-hospitals/actions/getApprovedHospitals";

export default function UserHospitalsPage() {
  const [hospitals, setHospitals] = useState<UserHospital[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHospitals = async () => {
      const data = await getApprovedHospitals();
      setHospitals(data);
      setLoading(false);
    };
    fetchHospitals();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Approved Hospitals</h1>
      {hospitals.length === 0 ? (
        <p className="text-gray-500">No hospitals available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hospitals.map((h) => (
            <div
              key={h.id}
              className="border rounded p-4 cursor-pointer hover:shadow"
              onClick={() => router.push(`/user/hospital/${h.id}`)}
            >
              <div className="flex items-center gap-4">
                {h.logo && (
                  <img
                    src={h.logo}
                    alt={h.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <h2 className="font-semibold text-lg">{h.name}</h2>
                  <p className="text-gray-500">
                    {h.city}, {h.state}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
