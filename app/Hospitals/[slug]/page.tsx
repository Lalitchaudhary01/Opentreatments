"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getHospitalBySlug } from "@/features/Hospitals/actions/getHospitalBySlug";
import { Hospital } from "@/features/Hospitals/types/hospital";

export default function HospitalDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHospital() {
      try {
        const data = await getHospitalBySlug(slug);
        setHospital(data);
      } catch (err) {
        console.error("Failed to fetch hospital:", err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchHospital();
  }, [slug]);

  if (loading) return <p>Loading hospital details...</p>;
  if (!hospital) return <p>Hospital not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Basic Info */}
      <section className="space-y-2 border-b pb-4">
        <h2 className="text-2xl font-semibold">{hospital.name}</h2>
        {hospital.logo && (
          <Image
            src={hospital.logo}
            alt={hospital.name}
            width={120}
            height={120}
            className="rounded-lg"
          />
        )}
        <p>{hospital.description}</p>
        <p>
          <strong>Address:</strong> {hospital.address}, {hospital.city}, {hospital.state},{" "}
          {hospital.country}
        </p>
        <p>
          <strong>Phone:</strong> {hospital.phone} | <strong>Email:</strong> {hospital.email}
        </p>
        {hospital.website && (
          <p>
            <strong>Website:</strong>{" "}
            <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {hospital.website}
            </a>
          </p>
        )}
      </section>

      {/* Facilities */}
      {hospital.facilities.length > 0 && (
        <section className="space-y-2 border-b pb-4">
          <h3 className="text-xl font-semibold">Facilities</h3>
          <ul className="list-disc list-inside">
            {hospital.facilities.map(f => (
              <li key={f.id}>{f.name}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Services */}
      {hospital.services.length > 0 && (
        <section className="space-y-2 border-b pb-4">
          <h3 className="text-xl font-semibold">Services</h3>
          {hospital.services.map(s => (
            <div key={s.id} className="p-2 border rounded mb-2">
              <p><strong>Name:</strong> {s.name}</p>
              {s.description && <p><strong>Description:</strong> {s.description}</p>}
              {s.cost !== null && <p><strong>Cost:</strong> ₹{s.cost}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Insurance */}
      {hospital.insurances.length > 0 && (
        <section className="space-y-2 border-b pb-4">
          <h3 className="text-xl font-semibold">Insurance</h3>
          <ul className="list-disc list-inside">
            {hospital.insurances.map(i => (
              <li key={i.id}>
                {i.name} {i.provider && `(${i.provider})`} {i.cashless ? "- Cashless available" : ""}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Doctors */}
      {hospital.doctors.length > 0 && (
        <section className="space-y-2 border-b pb-4">
          <h3 className="text-xl font-semibold">Doctors</h3>
          <ul className="list-disc list-inside">
            {hospital.doctors.map(d => (
              <li key={d.id}>
                {d.name} - {d.specialization} {d.experience !== null && `(${d.experience} yrs)`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Procedures */}
      {hospital.procedures.length > 0 && (
        <section className="space-y-2 border-b pb-4">
          <h3 className="text-xl font-semibold">Procedures</h3>
          {hospital.procedures.map(p => (
            <div key={p.id} className="p-2 border rounded mb-2">
              <p><strong>Name:</strong> {p.name}</p>
              {p.description && <p><strong>Description:</strong> {p.description}</p>}
              {p.cost !== null && <p><strong>Cost:</strong> ₹{p.cost}</p>}
              {p.duration && <p><strong>Duration:</strong> {p.duration}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
