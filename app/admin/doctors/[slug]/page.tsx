"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDoctorById } from "@/features/admin/IndependentDoctors/actions/getDoctorById";
import type { IndependentDoctor } from "@/features/admin/IndependentDoctors/types/independentDoctor";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Star,
  Clock,
  Calendar,
  Languages,
  Award,
  User,
  IndianRupee,
  Stethoscope,
} from "lucide-react";

export default function DoctorDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [doctor, setDoctor] = useState<IndependentDoctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doc = await getDoctorById(slug);
        setDoctor(doc);
      } catch {
        setError("Failed to fetch doctor details");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="text-red-500 text-center">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!doctor) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <h2 className="text-xl font-semibold mb-2">Doctor Not Found</h2>
          <p className="text-muted-foreground">No doctor found with this ID</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-32 h-32 mx-auto md:mx-0">
              <AvatarImage src={doctor.profilePic} alt={doctor.name} />
              <AvatarFallback className="text-2xl">
                {doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
                  <p className="text-lg text-muted-foreground mb-2">
                    {doctor.specialization}
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-muted-foreground">
                        ({doctor.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4 md:mt-0">
                  <Button size="lg" className="w-full md:w-auto">
                    Book Appointment
                  </Button>
                  {doctor.fees !== undefined && (
                    <div className="flex items-center justify-center md:justify-start gap-1 text-lg font-semibold">
                      <IndianRupee className="w-5 h-5" />
                      <span>{doctor.fees}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {doctor.experience !== undefined && (
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Experience:</span>
                    <span className="ml-2">{doctor.experience} years</span>
                  </div>
                </div>
              )}

              {doctor.gender && (
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Gender:</span>
                    <span className="ml-2">{doctor.gender}</span>
                  </div>
                </div>
              )}

              {doctor.city && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Location:</span>
                    <span className="ml-2">{doctor.city}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Specialties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5" />
                Specialties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {doctor.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="w-5 h-5" />
                Languages Spoken
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((language, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {language}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          {doctor.availability && doctor.availability.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {doctor.availability.map((slot, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="font-medium mb-2 sm:mb-0">{slot.day}</div>
                      <div className="flex flex-wrap gap-1">
                        {slot.slots.map((time, timeIndex) => (
                          <Badge
                            key={timeIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            {time}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Badges/Achievements */}
          {doctor.badges && doctor.badges.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {doctor.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-muted/50 rounded"
                    >
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{badge}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="default">
                Book Appointment
              </Button>
              <Button className="w-full" variant="outline">
                View Reviews
              </Button>
              <Button className="w-full" variant="outline">
                Share Profile
              </Button>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {doctor.createdAt && (
                <div className="text-sm">
                  <span className="font-medium">Joined:</span>
                  <div className="text-muted-foreground">
                    {new Date(doctor.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              )}
              {doctor.updatedAt && (
                <div className="text-sm">
                  <span className="font-medium">Last Updated:</span>
                  <div className="text-muted-foreground">
                    {new Date(doctor.updatedAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
