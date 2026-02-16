"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PharmacyDashboardPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Pharmacy Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your pharmacy profile</p>
            <div className="mt-3 flex gap-2">
              <Button asChild>
                <Link href="/pharmacy/profile/view">View</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/pharmacy/profile/edit">Edit</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medicines</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage medicines and stock</p>
            <Button className="mt-3" asChild>
              <Link href="/pharmacy/medicines">Go to Medicines</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Check user orders</p>
            <Button className="mt-3" asChild>
              <Link href="/pharmacy/orders">Go to Orders</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Track stock entries and sales</p>
            <Button className="mt-3" asChild>
              <Link href="/pharmacy/inventory">Go to Inventory</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
