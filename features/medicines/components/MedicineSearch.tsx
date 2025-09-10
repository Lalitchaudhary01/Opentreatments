"use client";

import { useMedicineSearch } from "../hooks/useMedicineSearch";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function MedicineSearch() {
  const { query, results, loading, setQuery } = useMedicineSearch();

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for medicines..."
          className="pr-10"
        />
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        )}
      </div>

      {results.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {results.map((med) => (
                <div
                  key={med.id}
                  className="p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{med.name}</span>
                    <Badge variant="secondary" className="text-green-600">
                      ₹{med.price}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
