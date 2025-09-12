// /app/doctors/[id]/page.tsx
import { getDoctorById } from "@/features/IndependentDoctors/actions/getDoctorById";
import AvailabilityCalendar from "@/features/IndependentDoctors/compoents/AvailabilityCalendar";
import ReviewList from "@/features/IndependentDoctors/compoents/ReviewList";
import { IndependentDoctor } from "@/features/IndependentDoctors/types/IndependentDoctor";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
  MessageCircle,
  Share2,
} from "lucide-react";
import Link from "next/link";

interface DoctorProfilePageProps {
  params: {
    id: string;
  };
}

const DoctorProfilePage = async ({ params }: DoctorProfilePageProps) => {
  const doctor: IndependentDoctor | null = await getDoctorById(params.id);

  if (!doctor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <h2 className="text-xl font-semibold mb-2">Doctor Not Found</h2>
            <p className="text-muted-foreground">
              The doctor you're looking for doesn't exist.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-32 h-32 mx-auto md:mx-0">
              <AvatarImage
                src={doctor.profilePic || "/default-avatar.png"}
                alt={doctor.name}
              />
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

                  {doctor.city && (
                    <div className="flex items-center justify-center md:justify-start gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.city}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 mt-4 md:mt-0">
                  <Button size="lg" className="w-full md:w-auto">
                    <Link href={`/consultations/${doctor.slug}`}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Link>
                  </Button>

                  {doctor.fees !== undefined && (
                    <div className="flex items-center justify-center md:justify-start gap-1 text-lg font-semibold text-green-600">
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
                Doctor Information
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
            </CardContent>
          </Card>

          {/* Specialties */}
          {doctor.specialties && doctor.specialties.length > 0 && (
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
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Languages */}
          {doctor.languages && doctor.languages.length > 0 && (
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
          )}

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AvailabilityCalendar availability={doctor.availability || []} />
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Patient Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewList reviews={[]} />
            </CardContent>
          </Card>
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
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
              <Button className="w-full" variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat with Doctor
              </Button>
              <Button className="w-full" variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
            </CardContent>
          </Card>

          {/* Fee Information */}
          {doctor.fees !== undefined && (
            <Card>
              <CardHeader>
                <CardTitle>Consultation Fee</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-600">
                    <IndianRupee className="w-6 h-6" />
                    <span>{doctor.fees}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Per consultation
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Have questions about booking an appointment or need assistance?
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
