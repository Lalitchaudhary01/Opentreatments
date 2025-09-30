import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  User,
  Building2,
  Globe,
  FileText,
  Package,
  CheckCircle2,
  Clock,
  Star,
  Pill,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPharmacyById } from "@/features/admin/pharmacy/actions/getPharmacyById";
import { getMedicinesByPharmacy } from "@/features/user-pharmacies/actions/getMedicinesByPharmacy";
import UserMedicineList from "@/features/user-pharmacies/components/UserMedicineList";
import Header from "@/components/layout/Header";

interface PharmacyPageProps {
  params: { id: string };
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default async function PharmacyPage({ params }: PharmacyPageProps) {
  const pharmacy = await getPharmacyById(params.id);
  const medicines = await getMedicinesByPharmacy(params.id);

  if (!pharmacy) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-6">
          <Card className="border-2 border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/20">
            <CardContent className="p-8 text-center">
              <p className="text-xl font-bold text-red-600 dark:text-red-400">
                Pharmacy not found.
              </p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen mt-3 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 -left-32 w-96 h-96 bg-gradient-to-r from-cyan-400/15 to-teal-400/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-32 w-96 h-96 bg-gradient-to-r from-teal-500/15 to-sky-400/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="container mx-auto max-w-6xl px-6 py-12 relative z-10">
          {/* Hero Card */}
          <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden mb-8">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500" />

            <CardHeader className="space-y-6 pt-8">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-[300px]">
                  <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-cyan-50 via-white to-teal-50 dark:from-cyan-900/30 dark:via-slate-800/50 dark:to-teal-900/30 border-2 border-cyan-200 dark:border-cyan-700 text-teal-800 dark:text-teal-200 font-bold">
                    <Pill className="w-4 h-4 mr-2 text-cyan-600 dark:text-cyan-400" />
                    <span className="bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-300 dark:to-teal-300 bg-clip-text text-transparent">
                      Pharmacy Details
                    </span>
                  </Badge>

                  <CardTitle className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
                    {pharmacy.name}
                  </CardTitle>

                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-4 py-2">
                      <Star className="w-4 h-4 mr-1 fill-white" />
                      <span className="font-bold">4.8</span>
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-cyan-400 dark:border-cyan-600 text-cyan-700 dark:text-cyan-300 font-semibold px-4 py-2"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Verified
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-teal-400 dark:border-teal-600 text-teal-700 dark:text-teal-300 font-semibold px-4 py-2"
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Open Now
                    </Badge>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 p-6 rounded-3xl border-2 border-cyan-200 dark:border-cyan-700">
                  <Package className="w-12 h-12 text-cyan-600 dark:text-cyan-400" />
                </div>
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pharmacy.address && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <div className="bg-cyan-100 dark:bg-cyan-900/30 p-3 rounded-lg">
                      <MapPin className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                        Address
                      </p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {pharmacy.address}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-lg">
                    <Phone className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                      Phone
                    </p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {pharmacy.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="bg-cyan-100 dark:bg-cyan-900/30 p-3 rounded-lg">
                    <User className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                      Owner
                    </p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {pharmacy.ownerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                      Email
                    </p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {pharmacy.email}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 border border-cyan-200 dark:border-cyan-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    <p className="font-bold text-slate-700 dark:text-slate-200">
                      Location
                    </p>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-slate-600 dark:text-slate-300">
                      <span className="font-semibold">City:</span>{" "}
                      {pharmacy.city || "-"}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      <span className="font-semibold">State:</span>{" "}
                      {pharmacy.state || "-"}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      <span className="font-semibold">Country:</span>{" "}
                      {pharmacy.country || "-"}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 border border-cyan-200 dark:border-cyan-700">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    <p className="font-bold text-slate-700 dark:text-slate-200">
                      License
                    </p>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-slate-600 dark:text-slate-300">
                      <span className="font-semibold">Number:</span>{" "}
                      {pharmacy.licenseNumber}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      <span className="font-semibold">GST:</span>{" "}
                      {pharmacy.gstNumber || "-"}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 border border-cyan-200 dark:border-cyan-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    <p className="font-bold text-slate-700 dark:text-slate-200">
                      Status
                    </p>
                  </div>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2">
                    {pharmacy.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Medicines Card */}
          <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500" />

            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 p-3 rounded-xl border-2 border-cyan-200 dark:border-cyan-700">
                  <Package className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <CardTitle className="text-3xl font-black bg-gradient-to-r from-slate-800 to-teal-700 dark:from-slate-100 dark:to-teal-400 bg-clip-text text-transparent">
                  Available Medicines
                </CardTitle>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                Browse all medicines available at this pharmacy
              </p>
            </CardHeader>

            <CardContent>
              {medicines.length > 0 ? (
                <UserMedicineList pharmacyId={params.id} />
              ) : (
                <div className="text-center py-12 px-6">
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-slate-400 dark:text-slate-600" />
                  </div>
                  <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">
                    No medicines available in this pharmacy.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
