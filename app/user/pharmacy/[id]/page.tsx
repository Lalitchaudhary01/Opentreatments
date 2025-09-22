// import { getPharmacyById } from "@/features/panel/admin-pharmacies/actions/getPharmacyById";
// import { getMedicinesByPharmacy } from "@/features/panel/user-pharmacies/actions/getMedicinesByPharmacy";
// import UserMedicineList from "@/features/panel/user-pharmacies/components/UserMedicineList";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getPharmacyById } from "@/features/admin/pharmacy/actions/getPharmacyById";
import { getMedicinesByPharmacy } from "@/features/user-pharmacies/actions/getMedicinesByPharmacy";
import UserMedicineList from "@/features/user-pharmacies/components/UserMedicineList";

interface PharmacyPageProps {
  params: { id: string };
}

export default async function PharmacyPage({ params }: PharmacyPageProps) {
  const pharmacy = await getPharmacyById(params.id);
  const medicines = await getMedicinesByPharmacy(params.id);

  if (!pharmacy) {
    return <p className="p-6 text-red-500">Pharmacy not found.</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {pharmacy.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{pharmacy.address}</p>
          <p className="text-sm text-muted-foreground">📞 {pharmacy.contact}</p>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Medicines</h2>
          {medicines.length > 0 ? (
            <UserMedicineList pharmacyId={params.id} />
          ) : (
            <p className="text-sm text-muted-foreground">
              No medicines available in this pharmacy.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
