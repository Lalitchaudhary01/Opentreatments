// /app/doctors/[id]/page.tsx

import { getDoctorById } from "@/features/IndependentDoctors/actions/getDoctorById";
import AvailabilityCalendar from "@/features/IndependentDoctors/compoents/AvailabilityCalendar";
import ReviewList from "@/features/IndependentDoctors/compoents/ReviewList";
import { IndependentDoctor } from "@/features/IndependentDoctors/types/IndependentDoctor";

interface DoctorProfilePageProps {
  params: {
    id: string;
  };
}

const DoctorProfilePage = async ({ params }: DoctorProfilePageProps) => {
  const doctor: IndependentDoctor | null = await getDoctorById(params.id);

  if (!doctor) {
    return <div className="p-6">Doctor not found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <img
          src={doctor.profilePic || "/default-avatar.png"}
          alt={doctor.name}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{doctor.name}</h1>
          <p className="text-gray-700">{doctor.specialization}</p>
          <p className="text-sm text-gray-600">
            {doctor.city || "Location not specified"}
          </p>
          <p className="text-yellow-500">
            ⭐ {doctor.rating} ({doctor.totalReviews} reviews)
          </p>
          <p className="text-sm text-gray-500">
            Experience: {doctor.experience ?? "N/A"} years
          </p>
          <p className="text-sm text-gray-500">
            Gender: {doctor.gender ?? "N/A"}
          </p>
          <p className="text-sm text-gray-500">Fees: ₹{doctor.fees ?? "N/A"}</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Specialties</h2>
        <ul className="list-disc list-inside">
          {doctor.specialties.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Languages</h2>
        <ul className="list-disc list-inside">
          {doctor.languages.map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Badges</h2>
        <div className="flex gap-2 flex-wrap">
          {doctor.badges.length > 0 ? (
            doctor.badges.map((badge, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm"
              >
                {badge}
              </span>
            ))
          ) : (
            <span className="text-gray-500">No badges available.</span>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Availability</h2>
        <AvailabilityCalendar availability={doctor.availability || []} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Reviews</h2>
        <ReviewList reviews={[]} />
      </div>
    </div>
  );
};

export default DoctorProfilePage;
