"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminDoctorList from "@/features/admin/doctors/components/AdminDoctorList";
import { DoctorStatus } from "@/features/admin/doctors/types/adminDoctor";
import {
  Stethoscope,
  Clock,
  CheckCircle,
  XCircle,
  Sparkles,
} from "lucide-react";

export default function AdminDoctorsPage() {
  const [counts, setCounts] = useState({
    PENDING: 0,
    APPROVED: 0,
    REJECTED: 0,
  });

  // 🔗 Replace with API call later
  useEffect(() => {
    setCounts({
      PENDING: 5,
      APPROVED: 12,
      REJECTED: 3,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/10 via-teal-400/10 to-sky-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-gradient-to-r from-teal-500/10 via-sky-400/10 to-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="p-6 space-y-6 relative z-10">
        {/* Page Header */}
        <div className="flex items-center justify-between border-b-2 border-cyan-200 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-cyan-50 to-teal-50 border-2 border-cyan-300 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4 text-cyan-600 animate-pulse" />
                <span className="bg-gradient-to-r from-cyan-700 to-teal-700 bg-clip-text text-transparent font-bold text-sm">
                  Doctor Management
                </span>
              </div>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent mb-2">
              Manage Doctors
            </h1>
            <p className="text-slate-600 font-semibold text-lg">
              Approve, reject, or delete doctor profiles from the system.
            </p>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl" />
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-600 mb-1 uppercase tracking-wider">
                    Pending Review
                  </p>
                  <p className="text-5xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {counts.PENDING}
                  </p>
                </div>
                <div className="h-16 w-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-2xl" />
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-600 mb-1 uppercase tracking-wider">
                    Approved
                  </p>
                  <p className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {counts.APPROVED}
                  </p>
                </div>
                <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400/20 to-transparent rounded-full blur-2xl" />
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-600 mb-1 uppercase tracking-wider">
                    Rejected
                  </p>
                  <p className="text-5xl font-black bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                    {counts.REJECTED}
                  </p>
                </div>
                <div className="h-16 w-16 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <XCircle className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs with Counts */}
        <Card className="border-2 border-cyan-200 shadow-2xl bg-white/90 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl" />
          <CardContent className="pt-6 relative z-10">
            <Tabs defaultValue="PENDING" className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-6 bg-gradient-to-r from-slate-100 to-slate-50 border-2 border-slate-200 p-1.5 h-auto">
                <TabsTrigger
                  value="PENDING"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg py-3 font-bold transition-all duration-300"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Pending
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-white/90 text-amber-700 font-black border-2 border-amber-200"
                  >
                    {counts.PENDING}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="APPROVED"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg py-3 font-bold transition-all duration-300"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approved
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-white/90 text-green-700 font-black border-2 border-green-200"
                  >
                    {counts.APPROVED}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="REJECTED"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-500 data-[state=active]:text-white data-[state=active]:shadow-lg py-3 font-bold transition-all duration-300"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Rejected
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-white/90 text-red-700 font-black border-2 border-red-200"
                  >
                    {counts.REJECTED}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              {/* Pending */}
              <TabsContent value="PENDING" className="mt-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
                  <AdminDoctorList status={DoctorStatus.PENDING} />
                </div>
              </TabsContent>

              {/* Approved */}
              <TabsContent value="APPROVED" className="mt-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <AdminDoctorList status={DoctorStatus.APPROVED} />
                </div>
              </TabsContent>

              {/* Rejected */}
              <TabsContent value="REJECTED" className="mt-6">
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border-2 border-red-200">
                  <AdminDoctorList status={DoctorStatus.REJECTED} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
