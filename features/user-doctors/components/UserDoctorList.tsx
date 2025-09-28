"use client";
import { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getApprovedDoctors } from "../actions/getApprovedDoctors";
import { UserDoctor } from "../types/userDoctor";
import Link from "next/link";
import {
  MapPin,
  Clock,
  IndianRupee,
  Languages,
  Star,
  Stethoscope,
  Calendar,
  Award,
  Users,
} from "lucide-react";

export default function UserDoctorList() {
  const [doctors, setDoctors] = useState<UserDoctor[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getApprovedDoctors();
      setDoctors(data);
    });
  }, []);

  if (isPending && doctors.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-lg font-medium text-muted-foreground animate-pulse">
            Finding the best doctors for you...
          </p>
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Stethoscope className="h-16 w-16 mx-auto text-muted-foreground/50" />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-muted-foreground">
              No Doctors Available
            </h3>
            <p className="text-muted-foreground/70 max-w-md">
              We couldn't find any approved doctors at the moment. Please check
              back later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Available Doctors</h2>
        <p className="text-muted-foreground">
          Find and connect with verified healthcare professionals
        </p>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">
            {doctors.length} Doctor{doctors.length !== 1 ? "s" : ""} Available
          </span>
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-600 font-medium">
            All Verified & Approved
          </span>
        </div>
      </div>

      {/* Doctor Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {doctors.map((doctor) => (
          <Card
            key={doctor.id}
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-gradient-to-br from-background via-background to-muted/20"
          >
            <CardHeader className="pb-3">
              {/* Doctor Avatar & Basic Info */}
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/medical/svg?seed=${doctor.id}`}
                  />
                  <AvatarFallback className="bg-primary/5 text-primary font-semibold">
                    {getInitials(doctor.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                    {doctor.name}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="mt-1 text-xs bg-primary/5 text-primary hover:bg-primary/10 font-medium"
                  >
                    {doctor.specialization}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Specialties */}
              {doctor.specialties && doctor.specialties.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Specialties
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {doctor.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs px-2 py-0.5 bg-background hover:bg-muted/50"
                      >
                        {specialty}
                      </Badge>
                    ))}
                    {doctor.specialties.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-xs px-2 py-0.5 bg-muted/30"
                      >
                        +{doctor.specialties.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Key Information Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Experience */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-blue-500" />
                    <span className="text-xs text-muted-foreground font-medium">
                      Experience
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-blue-600">
                    {doctor.experience ?? 0} years
                  </p>
                </div>

                {/* Fees */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <IndianRupee className="h-3.5 w-3.5 text-green-500" />
                    <span className="text-xs text-muted-foreground font-medium">
                      Consultation
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-green-600">
                    ₹{doctor.fees ?? "N/A"}
                  </p>
                </div>
              </div>

              {/* Location & Languages */}
              <div className="space-y-2">
                {doctor.city && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground truncate">
                      {doctor.city}
                    </span>
                  </div>
                )}

                {doctor.languages && doctor.languages.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Languages className="h-3.5 w-3.5 text-purple-500 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground truncate">
                      {doctor.languages.slice(0, 2).join(", ")}
                      {doctor.languages.length > 2 &&
                        ` +${doctor.languages.length - 2}`}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link href={`/user/doctors/${doctor.id}`}>
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary group-hover:shadow-lg transition-all duration-200"
                    size="sm"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    View Profile & Book
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
