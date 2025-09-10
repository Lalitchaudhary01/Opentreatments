"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Pill,
  Package,
  DollarSign,
  Activity,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  MapPin,
  Phone,
  Building2,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { getSubstitutes } from "@/features/medicines/actions/getSubstitutes";
import { getPriceTrends } from "@/features/medicines/actions/getPriceTrends";
import { getNearbyPharmacies } from "@/features/medicines/actions/getNearbyPharmacies";
import { getMedicineBySlug } from "@/features/medicines/actions/getMedicinesBySlug";
import {
  MedicineBase,
  MedicineDetail,
} from "@/features/medicines/types/medicine";

// Simple chart lib (you can replace with Recharts later)
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function MedicineDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [medicine, setMedicine] = useState<MedicineDetail | null>(null);
  const [subs, setSubs] = useState<MedicineBase[]>([]);
  const [priceTrend, setPriceTrend] = useState<{ date: Date; price: number }[]>(
    []
  );
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      setLoading(true);

      try {
        const med = await getMedicineBySlug(slug);
        setMedicine(med);

        if (med) {
          const [s, p, ph] = await Promise.all([
            getSubstitutes(med.id),
            getPriceTrends(med.id),
            getNearbyPharmacies(med.id, "Delhi"), // default city for demo
          ]);

          setSubs(s);
          setPriceTrend(p);
          setPharmacies(ph);
        }
      } catch (error) {
        console.error("Error fetching medicine data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading medicine details...</p>
        </div>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Medicine not found. Please check the URL and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {medicine.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {medicine.genericName}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm">
                  <Activity className="h-3 w-3 mr-1" />
                  {medicine.strength}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  <Package className="h-3 w-3 mr-1" />
                  {medicine.packSize}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                ₹{medicine.price}
              </div>
              <p className="text-sm text-gray-500">Current Price</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Substitutes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-green-600" />
                  Available Substitutes ({subs.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {subs.length > 0 ? (
                  <div className="space-y-3">
                    {subs.map((substitute) => (
                      <div
                        key={substitute.id}
                        className="flex justify-between items-center p-3 border rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {substitute.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {substitute.genericName}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">
                            ₹{substitute.price}
                          </div>
                          <Button variant="outline" size="sm" className="mt-1">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No substitutes available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Price Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Price Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                {priceTrend.length > 0 ? (
                  <div className="h-64">
                    <Line
                      data={{
                        labels: priceTrend.map((p) =>
                          p.date.toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                          })
                        ),
                        datasets: [
                          {
                            label: "Price (₹)",
                            data: priceTrend.map((p) => p.price),
                            borderColor: "rgb(59, 130, 246)",
                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: false,
                            grid: {
                              color: "rgba(0, 0, 0, 0.1)",
                            },
                          },
                          x: {
                            grid: {
                              display: false,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No price trend data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Nearby Pharmacies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-600" />
                  Available at Pharmacies ({pharmacies.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pharmacies.length > 0 ? (
                  <div className="space-y-4">
                    {pharmacies.map((pharmacy) => (
                      <div
                        key={pharmacy.id}
                        className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Building2 className="h-4 w-4 text-gray-500" />
                              <h3 className="font-semibold text-gray-900">
                                {pharmacy.name}
                              </h3>
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                <span>
                                  {pharmacy.address}, {pharmacy.city}
                                </span>
                              </div>
                              {pharmacy.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3" />
                                  <span>{pharmacy.phone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="mb-2">
                              Available
                            </Badge>
                            <div>
                              <Button size="sm" variant="default">
                                Get Directions
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No pharmacies found in your area</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Search Other Areas
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Medicine Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-purple-600" />
                  Medicine Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">
                          Strength
                        </span>
                      </div>
                      <p className="font-semibold text-blue-900">
                        {medicine.strength}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Package className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          Pack Size
                        </span>
                      </div>
                      <p className="font-semibold text-green-900">
                        {medicine.packSize}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Generic Name</h4>
                    <p className="text-gray-600">{medicine.genericName}</p>
                  </div>

                  {medicine.description && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">
                          Description
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {medicine.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
