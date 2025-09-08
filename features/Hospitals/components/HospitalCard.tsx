"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface HospitalCardProps {
  hospital: {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    specializations: { id: string; name: string }[];
  };
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <Card className="hover:shadow-lg transition cursor-pointer">
      <CardHeader>
        <CardTitle>{hospital.name}</CardTitle>
        <p className="text-sm text-gray-600">
          {hospital.city}, {hospital.state}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{hospital.address}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {hospital.specializations.map((spec) => (
            <span
              key={spec.id}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
            >
              {spec.name}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
