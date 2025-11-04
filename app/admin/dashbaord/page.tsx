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
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";

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
      approved: stats.doctors.approved,
      icon: Stethoscope,
      link: "/admin/doctor",
      gradient: "from-zinc-900 to-zinc-800",
    },
    {
      title: "Hospitals",
      total: stats.hospitals.total,
      pending: stats.hospitals.pending,
      approved: stats.hospitals.approved,
      icon: Building,
      link: "/admin/hospitals/hospitals",
      gradient: "from-zinc-800 to-zinc-900",
    },
    {
      title: "Insurance Companies",
      total: stats.insurance.total,
      pending: stats.insurance.pending,
      approved: stats.insurance.approved,
      icon: CreditCard,
      link: "/admin/insurance",
      gradient: "from-zinc-900 to-zinc-800",
    },
    {
      title: "Pharmacies",
      total: stats.pharmacies.total,
      pending: stats.pharmacies.pending,
      approved: stats.pharmacies.approved,
      icon: ShoppingCart,
      link: "/admin/pharmacy",
      gradient: "from-zinc-800 to-zinc-900",
    },
  ];

  const totalUsers =
    stats.doctors.total +
    stats.hospitals.total +
    stats.insurance.total +
    stats.pharmacies.total;

  const totalPending =
    stats.doctors.pending +
    stats.hospitals.pending +
    stats.insurance.pending +
    stats.pharmacies.pending;

  const totalApproved =
    stats.doctors.approved +
    stats.hospitals.approved +
    stats.insurance.approved +
    stats.pharmacies.approved;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header showNav={false} />

      <div className="p-8 max-w-7xl mx-auto mt-8 space-y-8">
        {/* Page Header */}
        <div className="border-b border-zinc-200 pb-6">
          <h1 className="text-4xl font-bold text-zinc-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-zinc-600 text-lg">
            Centralized management and oversight of all system entities
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-zinc-200 bg-gradient-to-br from-zinc-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600 mb-1">
                    Total Entities
                  </p>
                  <p className="text-3xl font-bold text-zinc-900">
                    {totalUsers}
                  </p>
                </div>
                <div className="h-12 w-12 bg-zinc-900 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 bg-gradient-to-br from-zinc-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600 mb-1">
                    Pending Approval
                  </p>
                  <p className="text-3xl font-bold text-zinc-900">
                    {totalPending}
                  </p>
                </div>
                <div className="h-12 w-12 bg-zinc-900 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 bg-gradient-to-br from-zinc-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600 mb-1">
                    Approved
                  </p>
                  <p className="text-3xl font-bold text-zinc-900">
                    {totalApproved}
                  </p>
                </div>
                <div className="h-12 w-12 bg-zinc-900 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Entity Cards */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
            Entity Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat) => (
              <Link key={stat.title} href={stat.link}>
                <Card className="group border-zinc-200 hover:border-zinc-900 transition-all duration-300 hover:shadow-xl overflow-hidden cursor-pointer h-full">
                  <div className={`bg-gradient-to-br ${stat.gradient} p-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <TrendingUp className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {stat.title}
                    </h3>
                    <p className="text-4xl font-bold text-white mb-4">
                      {stat.total}
                    </p>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-zinc-600">Approved</span>
                      </div>
                      <span className="font-semibold text-zinc-900">
                        {stat.approved}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                        <span className="text-zinc-600">Pending</span>
                      </div>
                      <span className="font-semibold text-zinc-900">
                        {stat.pending}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-zinc-200">
            <CardHeader className="border-b border-zinc-200 bg-zinc-50">
              <CardTitle className="text-zinc-900 text-xl">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-3">
                <Link href="/admin/doctor">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 border-zinc-200 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-zinc-100 group-hover:bg-white/20 flex items-center justify-center mr-3">
                      <Stethoscope className="h-4 w-4 text-zinc-900 group-hover:text-white" />
                    </div>
                    <span className="font-medium">Manage Doctors</span>
                  </Button>
                </Link>
                <Link href="/admin/hospitals/hospitals">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 border-zinc-200 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-zinc-100 group-hover:bg-white/20 flex items-center justify-center mr-3">
                      <Building className="h-4 w-4 text-zinc-900 group-hover:text-white" />
                    </div>
                    <span className="font-medium">Manage Hospitals</span>
                  </Button>
                </Link>
                <Link href="/admin/insurance">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 border-zinc-200 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-zinc-100 group-hover:bg-white/20 flex items-center justify-center mr-3">
                      <CreditCard className="h-4 w-4 text-zinc-900 group-hover:text-white" />
                    </div>
                    <span className="font-medium">Manage Insurance</span>
                  </Button>
                </Link>
                <Link href="/admin/pharmacy">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 border-zinc-200 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-zinc-100 group-hover:bg-white/20 flex items-center justify-center mr-3">
                      <ShoppingCart className="h-4 w-4 text-zinc-900 group-hover:text-white" />
                    </div>
                    <span className="font-medium">Manage Pharmacies</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200">
            <CardHeader className="border-b border-zinc-200 bg-zinc-50">
              <CardTitle className="text-zinc-900 text-xl">
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0">
                      <Activity className="h-5 w-5 text-zinc-900" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900">System Health</p>
                      <p className="text-sm text-zinc-600 mt-1">
                        All services operational
                      </p>
                    </div>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-zinc-900" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900">
                        Pending Reviews
                      </p>
                      <p className="text-sm text-zinc-600 mt-1">
                        {totalPending} items require attention
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-zinc-900 bg-zinc-100 px-3 py-1 rounded-full">
                    {totalPending}
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-zinc-900" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900">Approval Rate</p>
                      <p className="text-sm text-zinc-600 mt-1">
                        {totalUsers > 0
                          ? Math.round((totalApproved / totalUsers) * 100)
                          : 0}
                        % of entities approved
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-zinc-900">
                    {totalUsers > 0
                      ? Math.round((totalApproved / totalUsers) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
