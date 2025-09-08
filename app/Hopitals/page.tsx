import { getHospitals } from "@/features/Hospitals/actions/getHospitals";
import HospitalCard from "@/features/Hospitals/components/HospitalCard";

export default async function HospitalsPage() {
  const hospitals = await getHospitals();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Hospitals</h1>

      {hospitals.length === 0 ? (
        <p>No hospitals found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      )}
    </div>
  );
}
