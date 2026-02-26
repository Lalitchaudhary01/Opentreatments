"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function EditPharmacyProfile() {
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: call updatePharmacyProfile action
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Pharmacy Profile</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <Label htmlFor="name">Pharmacy Name</Label>
          <Input id="name" defaultValue="City Medico" required />
        </div>

        <div>
          <Label htmlFor="owner">Owner Name</Label>
          <Input id="owner" defaultValue="John Doe" required />
        </div>

        <div>
          <Label htmlFor="license">License Number</Label>
          <Input id="license" defaultValue="LIC12345" required />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
