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
  Sparkles,
  ArrowRight,
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
      gradient: "from-cyan-500 via-teal-500 to-sky-500",
    },
    {
      title: "Hospitals",
      total: stats.hospitals.total,
      pending: stats.hospitals.pending,
      approved: stats.hospitals.approved,
      icon: Building,
      link: "/admin/hospitals/hospitals",
      gradient: "from-teal-500 via-cyan-500 to-sky-500",
    },
    {
      title: "Insurance Companies",
      total: stats.insurance.total,
      pending: stats.insurance.pending,
      approved: stats.insurance.approved,
      icon: CreditCard,
      link: "/admin/insurance",
      gradient: "from-sky-500 via-cyan-500 to-teal-500",
    },
    {
      title: "Pharmacies",
      total: stats.pharmacies.total,
      pending: stats.pharmacies.pending,
      approved: stats.pharmacies.approved,
      icon: ShoppingCart,
      link: "/admin/pharmacy",
      gradient: "from-cyan-500 via-sky-500 to-teal-500",
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/10 via-teal-400/10 to-sky-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-gradient-to-r from-teal-500/10 via-sky-400/10 to-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Header */}
      <Header showNav={false} />

      <div className="p-8 max-w-7xl mx-auto mt-8 space-y-8 relative z-10">
        {/* Page Header */}
        <div className="border-b-2 border-cyan-200 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-cyan-50 to-teal-50 border-2 border-cyan-300 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 text-cyan-600 animate-pulse" />
              <span className="bg-gradient-to-r from-cyan-700 to-teal-700 bg-clip-text text-transparent font-bold text-sm">
                Admin Portal
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 text-lg font-semibold">
            Centralized management and oversight of all system entities
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-cyan-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-2xl" />
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-600 mb-1 uppercase tracking-wider">
                    Total Entities
                  </p>
                  <p className="text-5xl font-black bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                    {totalUsers}
                  </p>
                </div>
                <div className="h-16 w-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-teal-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-transparent rounded-full blur-2xl" />
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-600 mb-1 uppercase tracking-wider">
                    Pending Approval
                  </p>
                  <p className="text-5xl font-black bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">
                    {totalPending}
                  </p>
                </div>
                <div className="h-16 w-16 bg-gradient-to-br from-teal-500 to-sky-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-sky-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-400/20 to-transparent rounded-full blur-2xl" />
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-600 mb-1 uppercase tracking-wider">
                    Approved
                  </p>
                  <p className="text-5xl font-black bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                    {totalApproved}
                  </p>
                </div>
                <div className="h-16 w-16 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Entity Cards */}
        <div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent mb-6">
            Entity Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat) => (
              <Link key={stat.title} href={stat.link}>
                <Card className="group border-2 border-cyan-200 hover:border-cyan-400 transition-all duration-300 hover:shadow-2xl overflow-hidden cursor-pointer h-full">
                  <div
                    className={`bg-gradient-to-br ${stat.gradient} p-6 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <div className="h-14 w-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30 shadow-lg">
                        <stat.icon className="h-7 w-7 text-white" />
                      </div>
                      <TrendingUp className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1 relative z-10">
                      {stat.title}
                    </h3>
                    <p className="text-5xl font-black text-white mb-4 relative z-10 drop-shadow-lg">
                      {stat.total}
                    </p>
                  </div>
                  <CardContent className="pt-4 bg-white">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-sm"></div>
                        <span className="text-slate-600 font-semibold">
                          Approved
                        </span>
                      </div>
                      <span className="font-black text-slate-900">
                        {stat.approved}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-sm"></div>
                        <span className="text-slate-600 font-semibold">
                          Pending
                        </span>
                      </div>
                      <span className="font-black text-slate-900">
                        {stat.pending}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-2 border-cyan-200 shadow-2xl bg-white/90 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl" />
            <CardHeader className="border-b border-cyan-100 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
                  Quick Actions
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 relative z-10">
              <div className="grid grid-cols-1 gap-3">
                <Link href="/admin/doctor" className="group">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 border-2 border-cyan-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:via-teal-500 hover:to-sky-500 hover:text-white hover:border-cyan-400 transition-all"
                  >
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-100 to-teal-100 group-hover:from-white/20 group-hover:to-white/20 flex items-center justify-center mr-3 transition-all">
                      <Stethoscope className="h-5 w-5 text-cyan-600 group-hover:text-white" />
                    </div>
                    <span className="font-bold">Manage Doctors</span>
                    <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/admin/hospitals/hospitals" className="group">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 border-2 border-teal-200 hover:bg-gradient-to-r hover:from-teal-500 hover:via-cyan-500 hover:to-sky-500 hover:text-white hover:border-teal-400 transition-all"
                  >
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-teal-100 to-cyan-100 group-hover:from-white/20 group-hover:to-white/20 flex items-center justify-center mr-3 transition-all">
                      <Building className="h-5 w-5 text-teal-600 group-hover:text-white" />
                    </div>
                    <span className="font-bold">Manage Hospitals</span>
                    <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/admin/insurance" className="group">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 border-2 border-sky-200 hover:bg-gradient-to-r hover:from-sky-500 hover:via-cyan-500 hover:to-teal-500 hover:text-white hover:border-sky-400 transition-all"
                  >
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-sky-100 to-cyan-100 group-hover:from-white/20 group-hover:to-white/20 flex items-center justify-center mr-3 transition-all">
                      <CreditCard className="h-5 w-5 text-sky-600 group-hover:text-white" />
                    </div>
                    <span className="font-bold">Manage Insurance</span>
                    <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/admin/pharmacy" className="group">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 border-2 border-cyan-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:via-sky-500 hover:to-teal-500 hover:text-white hover:border-cyan-400 transition-all"
                  >
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-100 to-sky-100 group-hover:from-white/20 group-hover:to-white/20 flex items-center justify-center mr-3 transition-all">
                      <ShoppingCart className="h-5 w-5 text-cyan-600 group-hover:text-white" />
                    </div>
                    <span className="font-bold">Manage Pharmacies</span>
                    <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-teal-200 shadow-2xl bg-white/90 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-teal-400/10 to-transparent rounded-full blur-3xl" />
            <CardHeader className="border-b border-teal-100 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-sky-500 rounded-lg flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
                  System Status
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 relative z-10">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Activity className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">System Health</p>
                      <p className="text-sm text-slate-600 mt-1 font-semibold">
                        All services operational
                      </p>
                    </div>
                  </div>
                  <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg animate-pulse"></div>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-100 to-sky-100 flex items-center justify-center flex-shrink-0 shadow-md">
                      <AlertCircle className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">
                        Pending Reviews
                      </p>
                      <p className="text-sm text-slate-600 mt-1 font-semibold">
                        {totalPending} items require attention
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-white bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 rounded-full shadow-lg">
                    {totalPending}
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center flex-shrink-0 shadow-md">
                      <TrendingUp className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Approval Rate</p>
                      <p className="text-sm text-slate-600 mt-1 font-semibold">
                        {totalUsers > 0
                          ? Math.round((totalApproved / totalUsers) * 100)
                          : 0}
                        % of entities approved
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-white bg-gradient-to-r from-cyan-500 to-teal-500 px-3 py-1.5 rounded-full shadow-lg">
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
