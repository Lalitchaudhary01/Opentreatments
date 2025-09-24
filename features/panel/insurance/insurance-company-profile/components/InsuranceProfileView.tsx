import { InsuranceProfile } from "../types/insuranceProfile";
import InsuranceStatusBadge from "./InsuranceStatusBadge";

interface InsuranceProfileViewProps {
  profile: InsuranceProfile;
}

export default function InsuranceProfileView({
  profile,
}: InsuranceProfileViewProps) {
  return (
    <div className="p-4 bg-white shadow rounded-md max-w-lg mx-auto space-y-3">
      <h2 className="text-xl font-semibold text-gray-800">Insurance Profile</h2>

      <div className="flex justify-between items-center">
        <span className="font-medium">Status:</span>
        <InsuranceStatusBadge status={profile.status} />
      </div>

      <div>
        <span className="font-medium">Company Name:</span> {profile.companyName}
      </div>

      <div>
        <span className="font-medium">Registration Number:</span>{" "}
        {profile.registrationNumber}
      </div>

      <div>
        <span className="font-medium">Address:</span> {profile.address}
      </div>

      <div>
        <span className="font-medium">Contact Email:</span>{" "}
        {profile.contactEmail}
      </div>

      <div>
        <span className="font-medium">Contact Phone:</span>{" "}
        {profile.contactPhone}
      </div>

      {profile.website && (
        <div>
          <span className="font-medium">Website:</span> {profile.website}
        </div>
      )}

      {profile.documents.length > 0 && (
        <div>
          <span className="font-medium">Documents:</span>
          <ul className="list-disc ml-5">
            {profile.documents.map((doc, idx) => (
              <li key={idx}>{doc}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
