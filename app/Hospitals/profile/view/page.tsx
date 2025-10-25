import { getHospitalProfile } from "@/features/panel/hospitals/hospital-profile/actions/getHospitalProfile";
import { HospitalProfileView } from "@/features/panel/hospitals/hospital-profile/components/HospitalProfileView";
import { HospitalStatusBadge } from "@/features/panel/hospitals/hospital-profile/components/HospitalStatusBadge";
import { redirect } from "next/navigation";

export default async function ViewHospitalProfilePage() {
  const profile = await getHospitalProfile();

  if (!profile) {
    redirect("/Hospitals/profile/submit");
  }

  // Transform null values to undefined for the component
  const transformedProfile = {
    ...profile,
    address: profile.address ?? undefined,
    city: profile.city ?? undefined,
    state: profile.state ?? undefined,
    country: profile.country ?? undefined,
    phone: profile.phone ?? undefined,
    email: profile.email ?? undefined,
    website: profile.website ?? undefined,
    logo: profile.logo ?? undefined,
    image: profile.image ?? undefined,
    createdAt: profile.createdAt.toISOString(),
    updatedAt: profile.updatedAt.toISOString(),
    services: profile.services?.map((service) => ({
      ...service,
      cost: service.cost ?? undefined,
      description: service.description ?? undefined,
    })),
    facilities: profile.facilities?.map((facility) => ({
      ...facility,
      description: facility.description ?? undefined,
    })),
    doctors: profile.doctors?.map((doctor) => ({
      ...doctor,
      experience: doctor.experience ?? undefined,
      profilePic: doctor.profilePic ?? undefined,
    })),
    procedures: profile.procedures?.map((procedure) => ({
      ...procedure,
      description: procedure.description ?? undefined,
      cost: procedure.cost ?? undefined,
      duration: procedure.duration ?? undefined,
    })),
    insurances: profile.Insurance?.map((insurance) => ({
      ...insurance,
      provider: insurance.provider ?? undefined,
    })),
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Hospital Profile</h1>
        <HospitalStatusBadge status={profile.status} />
      </div>

      <HospitalProfileView profile={transformedProfile} />

      {profile.status === "APPROVED" && (
        <p className="text-sm text-gray-600 mt-4">
          ✅ Your hospital profile is approved. You can update details anytime.
        </p>
      )}

      {profile.status === "PENDING" && (
        <p className="text-sm text-yellow-600 mt-4">
          ⏳ Your hospital profile is under review. Please wait for admin
          approval.
        </p>
      )}

      {profile.status === "REJECTED" && (
        <p className="text-sm text-red-600 mt-4">
          ❌ Your hospital profile was rejected. Please contact admin.
        </p>
      )}
    </div>
  );
}
