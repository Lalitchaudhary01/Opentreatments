"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDoctorById } from "@/features/admin/IndependentDoctors/actions/getDoctorById";
import type { IndependentDoctor } from "@/features/admin/IndependentDoctors/types/independentDoctor";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  if (loading) return <p>Loading doctor details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!doctor) return <p>No doctor found</p>;

  return (
    <Card className="max-w-3xl mx-auto">
      {doctor.profilePic && (
        <img
          src={doctor.profilePic}
          alt={doctor.name}
          className="w-48 h-48 object-cover rounded mx-auto mt-4"
        />
      )}

      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{doctor.name}</CardTitle>
        <p className="text-sm text-gray-500">{doctor.specialization}</p>
      </CardHeader>

      <CardContent className="space-y-2">
        <p>
          <strong>Specialties:</strong> {doctor.specialties.join(", ")}
        </p>

        <p>
          <strong>Languages:</strong> {doctor.languages.join(", ")}
        </p>

        {doctor.experience !== undefined && (
          <p>
            <strong>Experience:</strong> {doctor.experience} years
          </p>
        )}

        {doctor.gender && (
          <p>
            <strong>Gender:</strong> {doctor.gender}
          </p>
        )}

        {doctor.fees !== undefined && (
          <p>
            <strong>Fees:</strong> ₹{doctor.fees}
          </p>
        )}

        {doctor.city && (
          <p>
            <strong>City:</strong> {doctor.city}
          </p>
        )}

        {doctor.badges && doctor.badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {doctor.badges.map((b, i) => (
              <Badge key={i} variant="secondary">
                {b}
              </Badge>
            ))}
          </div>
        )}

        {doctor.availability && doctor.availability.length > 0 && (
          <div>
            <strong>Availability:</strong>
            <ul className="list-disc ml-6">
              {doctor.availability.map((a, i) => (
                <li key={i}>
                  {a.day}: {a.slots.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p>
          <strong>Rating:</strong> {doctor.rating} ({doctor.totalReviews}{" "}
          reviews)
        </p>

        {doctor.createdAt && (
          <p className="text-sm text-gray-500">
            <strong>Created At:</strong>{" "}
            {new Date(doctor.createdAt).toLocaleString()}
          </p>
        )}
        {doctor.updatedAt && (
          <p className="text-sm text-gray-500">
            <strong>Updated At:</strong>{" "}
            {new Date(doctor.updatedAt).toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
