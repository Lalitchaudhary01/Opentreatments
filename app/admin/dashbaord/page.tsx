"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  Building,
  CreditCard,
  ShoppingCart,
  Users,
  Activity,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    doctors: { total: 0, pending: 0, approved: 0 },
    hospitals: { total: 0, pending: 0, approved: 0 },
    insurance: { total: 0, pending: 0, approved: 0 },
    pharmacies: { total: 0, pending: 0, approved: 0 },
  });

  useEffect(() => {
    // TODO: Fetch real stats from API
    setStats({
      doctors: { total: 12, pending: 5, approved: 7 },
      hospitals: { total: 8, pending: 2, approved: 6 },
      insurance: { total: 15, pending: 3, approved: 12 },
      pharmacies: { total: 20, pending: 4, approved: 16 },
    });
  }, []);

  const statCards = [
    {
      title: "Doctors",
      total: stats.doctors.total,
      pending: stats.doctors.pending,
      icon: Stethoscope,
      link: "/admin/doctor",
      color: "bg-blue-500",
    },
    {
      title: "Hospitals",
      total: stats.hospitals.total,
      pending: stats.hospitals.pending,
      icon: Building,
      link: "/admin/hospitals/hospitals",
      color: "bg-green-500",
    },
    {
      title: "Insurance Companies",
      total: stats.insurance.total,
      pending: stats.insurance.pending,
      icon: CreditCard,
      link: "/admin/insurance",
      color: "bg-purple-500",
    },
    {
      title: "Pharmacies",
      total: stats.pharmacies.total,
      pending: stats.pharmacies.pending,
      icon: ShoppingCart,
      link: "/admin/pharmacy",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and oversee all system entities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.link}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.total}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.pending} pending approval
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/doctor">
              <Button variant="outline" className="w-full justify-start">
                <Stethoscope className="mr-2 h-4 w-4" />
                Manage Doctors
              </Button>
            </Link>
            <Link href="/admin/hospitals/hospitals">
              <Button variant="outline" className="w-full justify-start">
                <Building className="mr-2 h-4 w-4" />
                Manage Hospitals
              </Button>
            </Link>
            <Link href="/admin/insurance">
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Insurance Companies
              </Button>
            </Link>
            <Link href="/admin/pharmacy">
              <Button variant="outline" className="w-full justify-start">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Manage Pharmacies
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Total Users</span>
              </div>
              <span className="font-semibold">
                {stats.doctors.total +
                  stats.hospitals.total +
                  stats.insurance.total +
                  stats.pharmacies.total}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Pending Approvals</span>
              </div>
              <span className="font-semibold text-orange-600">
                {stats.doctors.pending +
                  stats.hospitals.pending +
                  stats.insurance.pending +
                  stats.pharmacies.pending}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
