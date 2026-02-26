import { getMedicineById } from "@/features/panel/pharmacy/pharmacy-medicines/actions/getMedicineById";
import PharmacyMedicineCard from "@/features/panel/pharmacy/pharmacy-medicines/components/PharmacyMedicineCard";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MedicineDetailsPage({ params }: Props) {
  const { id } = await params
  const medicine = await getMedicineById(id);

  if (!medicine) {
    return <p className="p-6 text-red-500">Medicine not found</p>;
  }

  return (
    <div className="p-6">
      <PharmacyMedicineCard medicine={medicine} />
    </div>
  );
}
