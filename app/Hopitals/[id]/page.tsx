import { getHospitalById } from "@/features/Hospitals/actions/getHospitalById";


interface Props {
  params: { id: string };
}

export default async function HospitalDetailPage({ params }: Props) {
  const hospital = await getHospitalById(params.id);

  if (!hospital) {
    return <p className="p-6">Hospital not found.</p>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">{hospital.name}</h1>
      <p className="text-gray-700 mb-2">📍 {hospital.location}</p>
      <p className="text-gray-700 mb-2">📧 {hospital.contactEmail}</p>
      <p className="text-gray-700 mb-2">📞 {hospital.contactPhone}</p>

      {/* TODO: services, facilities, doctors list add karna */}
    </div>
  );
}
