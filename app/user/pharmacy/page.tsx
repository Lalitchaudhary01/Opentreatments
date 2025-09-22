
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserPharmacyList from "@/features/user-pharmacies/components/UserPharmacyList";

export default function PharmaciesPage() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Available Pharmacies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UserPharmacyList />
        </CardContent>
      </Card>
    </div>
  );
}
