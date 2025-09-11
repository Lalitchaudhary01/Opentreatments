"use client";
import { useEffect, useState } from "react";
import {
  Plus,
  Users,
  MapPin,
  Stethoscope,
  Edit,
  Eye,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { getDoctors } from "@/features/admin/IndependentDoctors/actions/getDoctors";
import type { IndependentDoctor } from "@/features/admin/IndependentDoctors/types/independentDoctor";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DoctorsListPage() {
  const [doctors, setDoctors] = useState<IndependentDoctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<IndependentDoctor[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const result = await getDoctors();
        setDoctors(result);
        setFilteredDoctors(result);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    let filtered = doctors.filter(
      (doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.city && doc.city.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (selectedFilter !== "all") {
      filtered = filtered.filter(
        (doc) => doc.specialization === selectedFilter
      );
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, selectedFilter]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getSpecializationColor = (specialization: string) => {
    const colors = {
      Cardiology: "bg-red-50 text-red-700 border-red-200",
      Dermatology: "bg-green-50 text-green-700 border-green-200",
      Orthopedics: "bg-blue-50 text-blue-700 border-blue-200",
      Pediatrics: "bg-pink-50 text-pink-700 border-pink-200",
      Neurology: "bg-purple-50 text-purple-700 border-purple-200",
      Gynecology: "bg-orange-50 text-orange-700 border-orange-200",
    };
    return (
      colors[specialization as keyof typeof colors] ||
      "bg-gray-50 text-gray-700 border-gray-200"
    );
  };

  const specializations = [
    ...new Set(doctors.map((doc) => doc.specialization)),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-white rounded-lg"></div>
            <div className="h-96 bg-white rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Stethoscope className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Doctors Directory
                    </h1>
                    <p className="text-gray-600">
                      Manage and view all registered doctors
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">{doctors.length}</span>
                    <span>Total Doctors</span>
                  </div>
                </div>
              </div>

              <Link href="/admin/doctors/add">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 shadow-sm"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Doctor
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter Section */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search doctors by name, specialization, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-200">
                    <Filter className="h-4 w-4 mr-2" />
                    {selectedFilter === "all"
                      ? "All Specializations"
                      : selectedFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setSelectedFilter("all")}>
                    All Specializations
                  </DropdownMenuItem>
                  {specializations.map((spec) => (
                    <DropdownMenuItem
                      key={spec}
                      onClick={() => setSelectedFilter(spec)}
                    >
                      {spec}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Doctors Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Doctors List
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {filteredDoctors.length} of {doctors.length} doctors shown
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {filteredDoctors.length > 0 ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50">
                      <TableHead className="font-semibold text-gray-700 py-4">
                        Doctor
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Specialization
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Location
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDoctors.map((doc) => (
                      <TableRow
                        key={doc.id}
                        className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600">
                              <AvatarFallback className="text-white font-semibold bg-transparent text-sm">
                                {getInitials(doc.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <Link href={`/admin/doctors/${doc.id}`}>
                                <p className="font-semibold text-gray-900 text-sm hover:text-blue-600 cursor-pointer">
                                  {doc.name}
                                </p>
                              </Link>
                              <p className="text-xs text-gray-500">
                                ID: {doc.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${getSpecializationColor(
                              doc.specialization
                            )} font-medium text-xs`}
                          >
                            {doc.specialization}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">
                              {doc.city || "Not specified"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/doctors/${doc.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-3"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </Link>
                            <Link href={`/admin/doctors/${doc.id}/edit`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50 h-8 px-3"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchTerm || selectedFilter !== "all"
                    ? "No doctors found"
                    : "No doctors registered"}
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  {searchTerm || selectedFilter !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Get started by adding your first doctor to the system."}
                </p>
                <Link href="/admin/doctors/add">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Doctor
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
