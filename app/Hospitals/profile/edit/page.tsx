import { getHospitalProfile } from "@/features/panel/hospitals/hospital-profile/actions/getHospitalProfile";
import { HospitalProfileForm } from "@/features/panel/hospitals/hospital-profile/components/HospitalProfileForm";
import { redirect } from "next/navigation";

export default async function EditHospitalProfilePage() {
  const profile = await getHospitalProfile();

  if (!profile) {
    redirect("/hospital/profile/submit");
  }

  if (profile.status !== "APPROVED") {
    redirect("/hospital/profile/view");
  }

  // Transform null values to undefined for the form
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
    services: profile.services?.map((service) => ({
      ...service,
      cost: service.cost ?? undefined,
      description: service.description ?? undefined,
    })),
    facilities: profile.facilities?.map((facility) => ({
      ...facility,
      description: facility.description ?? undefined,
    })),
    insurances: profile.Insurance?.map((insurance) => ({
      ...insurance,
      provider: insurance.provider ?? undefined,
    })),
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Hospital Profile</h1>
      <HospitalProfileForm defaultValues={transformedProfile} isEdit={true} />
    </div>
  );
}
