"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPharmacy } from "../types/userPharmacy";
import UserMedicineList from "./UserMedicineList";

interface Props {
  pharmacy: UserPharmacy;
}

export default function UserPharmacyCard({ pharmacy }: Props) {
  const [showMedicines, setShowMedicines] = useState(false);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{pharmacy.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{pharmacy.address}</p>
        <p className="text-sm text-muted-foreground">📞 {pharmacy.contact}</p>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMedicines(!showMedicines)}
        >
          {showMedicines ? "Hide Medicines" : "View Medicines"}
        </Button>

        {showMedicines && (
          <div className="mt-4">
            <UserMedicineList pharmacyId={pharmacy.id} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
