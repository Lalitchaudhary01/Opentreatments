"use client";
import { UserHospital } from "../types/userHospital";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Users, Stethoscope } from "lucide-react";
import Link from "next/link";

type Props = {
  hospital: UserHospital;
};

export default function UserHospitalCard({ hospital }: Props) {
  return (
    <Link href={`/user/hospitals/${hospital.id}`} className="block">
      <Card className="hover:shadow-lg transition-shadow duration-300 group cursor-pointer hover:scale-[1.01] transition-transform">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={hospital.logo}
                alt={hospital.name}
                className="object-cover"
              />
              <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-700">
                {hospital.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {hospital.name}
              </h3>
              <div className="flex items-center gap-1 text-gray-500 mt-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {hospital.city}, {hospital.state}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Doctors Section */}
          {hospital.doctors.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-gray-700">Doctors</span>
                <Badge variant="secondary" className="ml-auto">
                  {hospital.doctors.length}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {hospital.doctors.map((doctor, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs hover:bg-blue-50 hover:border-blue-200"
                  >
                    {doctor.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Procedures Section */}
          {hospital.procedures.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-green-600" />
                <span className="font-medium text-gray-700">Procedures</span>
                <Badge variant="secondary" className="ml-auto">
                  {hospital.procedures.length}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {hospital.procedures.map((procedure, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs hover:bg-green-50 hover:border-green-200"
                  >
                    {procedure.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
