"use client";

import Image from "next/image";
import { HospitalStatus } from "@prisma/client";
import { HospitalStatusBadge } from "./HospitalStatusBadge";

interface HospitalProfile {
  id: string;
  userId: string;
  name: string;
  slug: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  image?: string;
  status: HospitalStatus;
  createdAt: string;
  updatedAt: string;
  services?: Array<{
    id: string;
    name: string;
    cost?: number;
    description?: string;
  }>;
  facilities?: Array<{
    id: string;
    name: string;
    description?: string;
  }>;
  doctors?: Array<{
    id: string;
    name: string;
    specialization: string;
    experience?: number;
    profilePic?: string;
  }>;
  procedures?: Array<{
    id: string;
    name: string;
    description?: string;
    cost?: number;
    duration?: string;
  }>;
  insurances?: Array<{
    id: string;
    name: string;
    provider?: string;
    cashless: boolean;
  }>;
}

export function HospitalProfileView({ profile }: { profile: HospitalProfile }) {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      <div className="flex items-center space-x-4">
        {profile.logo && (
          <Image
            src={profile.logo}
            alt="Hospital Logo"
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <HospitalStatusBadge status={profile.status} />
        </div>
      </div>

      {profile.image && (
        <Image
          src={profile.image}
          alt="Hospital"
          width={600}
          height={300}
          className="rounded-lg object-cover"
        />
      )}

      <div className="space-y-2">
        {profile.address && (
          <p>
            <strong>Address:</strong> {profile.address}
          </p>
        )}
        {profile.city && (
          <p>
            <strong>City:</strong> {profile.city}
          </p>
        )}
        {profile.state && (
          <p>
            <strong>State:</strong> {profile.state}
          </p>
        )}
        {profile.country && (
          <p>
            <strong>Country:</strong> {profile.country}
          </p>
        )}
        {profile.phone && (
          <p>
            <strong>Phone:</strong> {profile.phone}
          </p>
        )}
        {profile.email && (
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
        )}
        {profile.website && (
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={profile.website}
              target="_blank"
              className="text-blue-600 underline"
            >
              {profile.website}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
