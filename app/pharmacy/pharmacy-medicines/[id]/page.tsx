import { getMedicineById } from "@/features/panel/pharmacy/pharmacy-medicines/actions/getMedicineById";
import PharmacyMedicineCard from "@/features/panel/pharmacy/pharmacy-medicines/components/PharmacyMedicineCard";

type Props = {
  params: { id: string };
};

export default async function MedicineDetailsPage({ params }: Props) {
  const medicine = await getMedicineById(params.id);

  if (!medicine) {
    return <p className="p-6 text-red-500">Medicine not found</p>;
  }

  return (
    <div className="p-6">
      <PharmacyMedicineCard medicine={medicine} />
    </div>
  );
}
