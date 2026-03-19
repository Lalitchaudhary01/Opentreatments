import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Clock3,
  FlaskConical,
  Globe,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  TestTube2,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getLabById } from "@/features/user-labs/actions/getLabById";
import type { ReactNode } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UserLabDetailsPage({ params }: Props) {
  const { id } = await params;
  const lab = await getLabById(id);

  if (!lab) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="min-h-screen mt-3 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container mx-auto max-w-6xl px-6 py-10">
          <Card className="overflow-hidden border-2 border-slate-200 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
            <div className="h-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500" />
            <CardHeader className="space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Badge className="mb-3 border border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                    <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                    Approved Lab
                  </Badge>
                  <CardTitle className="text-4xl font-black text-slate-900 dark:text-slate-100">{lab.name}</CardTitle>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                      {[lab.city, lab.state, lab.country].filter(Boolean).join(", ") || "Location not set"}
                    </span>
                    {lab.phone ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                        {lab.phone}
                      </span>
                    ) : null}
                    {lab.website ? (
                      <a href={lab.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-cyan-600 hover:underline dark:text-cyan-400">
                        <Globe className="h-4 w-4" />
                        Visit Website
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-right dark:border-slate-700 dark:bg-slate-800/60">
                  <div className="inline-flex items-center gap-1 text-xl font-bold text-slate-900 dark:text-slate-100">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    {lab.rating.toFixed(1)}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{lab.totalReviews} reviews</p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{lab.homeCollection ? "Home collection available" : "In-lab collection"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <InfoChip label="Tests" value={String(lab.testsCount)} icon={<FlaskConical className="h-4 w-4" />} />
                <InfoChip label="Packages" value={String(lab.packagesCount)} icon={<TestTube2 className="h-4 w-4" />} />
                <InfoChip label="Status" value={lab.status} icon={<Activity className="h-4 w-4" />} />
                <InfoChip label="PIN" value={lab.pincode || "-"} icon={<MapPin className="h-4 w-4" />} />
              </div>
            </CardHeader>
          </Card>

          <div className="mt-6 grid gap-6 xl:grid-cols-[7fr_5fr]">
            <Card className="border-2 border-slate-200 bg-white/80 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Available Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lab.tests.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400">No active tests listed yet.</p>
                  ) : (
                    lab.tests.map((test) => (
                      <div key={test.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-slate-100">{test.name}</div>
                            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{test.category} · {test.sampleType || "Sample not set"}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-slate-900 dark:text-slate-100">₹{test.discountedPrice ?? test.price}</div>
                            {test.discountedPrice ? <div className="text-xs text-slate-500 line-through dark:text-slate-400">₹{test.price}</div> : null}
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                          <Badge variant="outline" className="border-cyan-300 text-cyan-700 dark:border-cyan-700 dark:text-cyan-300">
                            <Clock3 className="mr-1 h-3 w-3" />
                            {test.tatHours ? `${test.tatHours} hrs TAT` : "TAT not set"}
                          </Badge>
                          <Badge variant="outline" className="border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-300">
                            {test.fastingRequired ? "Fasting Required" : "No Fasting"}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-2 border-slate-200 bg-white/80 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Popular Packages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lab.packages.length === 0 ? (
                      <p className="text-sm text-slate-500 dark:text-slate-400">No packages listed yet.</p>
                    ) : (
                      lab.packages.map((pkg) => (
                        <div key={pkg.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
                          <div className="font-semibold text-slate-900 dark:text-slate-100">{pkg.name}</div>
                          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{pkg.category}</div>
                          <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="font-semibold text-slate-900 dark:text-slate-100">₹{pkg.discountedPrice ?? pkg.price}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{pkg.reportTat ? `${pkg.reportTat} hrs` : "TAT NA"}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-200 bg-white/80 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Lab Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <p><span className="font-semibold">Address:</span> {lab.address}</p>
                  {lab.registrationNumber ? <p><span className="font-semibold">Registration:</span> {lab.registrationNumber}</p> : null}
                  {lab.licenseNumber ? <p><span className="font-semibold">License:</span> {lab.licenseNumber}</p> : null}
                  {lab.description ? <p><span className="font-semibold">About:</span> {lab.description}</p> : null}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoChip({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
      <div className="mb-1 inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">{icon}{label}</div>
      <div className="font-semibold text-slate-900 dark:text-slate-100">{value}</div>
    </div>
  );
}
