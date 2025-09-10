"use client";

import { useDrawer } from "../hooks/useDrawer";
import { getSubstitutes } from "../actions/getSubstitutes";
import { useEffect, useState } from "react";
import { MedicineDetail } from "../types/medicine";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function DetailDrawer({ medicineId }: { medicineId: string }) {
  const { isOpen, closeDrawer } = useDrawer();
  const [subs, setSubs] = useState<MedicineDetail[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      getSubstitutes(medicineId)
        .then(setSubs)
        .finally(() => setLoading(false));
    }
  }, [isOpen, medicineId]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Medicine Substitutes</SheetTitle>
          <SheetDescription>
            Available alternatives for this medicine
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-3">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-3">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </CardContent>
              </Card>
            ))
          ) : subs.length > 0 ? (
            subs.map((substitute) => (
              <Card
                key={substitute.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{substitute.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {substitute.form} • {substitute.strength}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-200 bg-green-50"
                    >
                      ₹{substitute.price}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  No substitutes available
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
