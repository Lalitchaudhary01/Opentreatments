"use Client";
import { UserHospital } from "../types/userHospital";
import UserHospitalCard from "./UserHospitalCard";

type Props = {
  hospitals: UserHospital[];
};

export default function UserHospitalList({ hospitals }: Props) {
  if (hospitals.length === 0) {
    return <p className="text-gray-500">No hospitals available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {hospitals.map((h) => (
        <UserHospitalCard key={h.id} hospital={h} />
      ))}
    </div>
  );
}
