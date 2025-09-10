"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MapPin,
  Star,
  Shield,
  Phone,
  Building2,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  MoreVertical,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getHospitals } from "../../actions/getHospitals";
import { deleteHospital } from "../../actions/deleteHospital";
import type { Hospital } from "../../types/hospital";

export default function HospitalTable() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hospitalToDelete, setHospitalToDelete] = useState<Hospital | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  async function loadHospitals() {
    try {
      setLoading(true);
      const data = await getHospitals();
      setHospitals(data);
    } catch (error) {
      console.error("Error loading hospitals:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHospitals();
  }, []);

  // Filter hospitals based on search query
  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.city?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeColor = (type?: string) => {
    switch (type) {
      case "government":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "private":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "semi-private":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "text-yellow-500 fill-current"
            : i < rating
            ? "text-yellow-500 fill-current opacity-50"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const handleDeleteClick = (hospital: Hospital) => {
    setHospitalToDelete(hospital);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (hospitalToDelete) {
      try {
        await deleteHospital(hospitalToDelete.id);
        await loadHospitals();
      } catch (error) {
        console.error("Error deleting hospital:", error);
      }
    }
    setDeleteDialogOpen(false);
    setHospitalToDelete(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-32">
              <div className="text-muted-foreground">Loading hospitals...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-semibold text-foreground">
                  Hospitals Management
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  Manage and monitor hospital information
                </p>
              </div>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Hospital
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search hospitals by name or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {hospitals.length}
                </div>
                <div className="text-sm text-blue-800">Total Hospitals</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {hospitals.filter((h) => h.verified).length}
                </div>
                <div className="text-sm text-green-800">Verified</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {hospitals.filter((h) => h.emergencyAvailable).length}
                </div>
                <div className="text-sm text-orange-800">24/7 Emergency</div>
              </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Hospital</TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Rating</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHospitals.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-muted-foreground"
                      >
                        {searchQuery
                          ? "No hospitals found matching your search."
                          : "No hospitals found."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredHospitals.map((hospital) => (
                      <TableRow
                        key={hospital.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={hospital.image}
                                alt={hospital.name}
                              />
                              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-sm">
                                {hospital.name
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2) || "HH"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <Link
                                  href={`/admin/hospitals/${hospital.id}/edit`}
                                  className="font-medium text-foreground hover:text-primary transition-colors"
                                >
                                  {hospital.name}
                                </Link>
                                {hospital.verified && (
                                  <Shield className="h-4 w-4 text-green-600" />
                                )}
                              </div>
                              {hospital.emergencyAvailable && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs mt-1"
                                >
                                  24/7 Emergency
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            <div>
                              <div className="font-medium text-foreground">
                                {hospital.city}
                              </div>
                              {hospital.state && (
                                <div className="text-sm text-muted-foreground">
                                  {hospital.state}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          {hospital.phone ? (
                            <div className="flex items-center text-muted-foreground">
                              <Phone className="h-4 w-4 mr-2" />
                              <span className="text-sm">{hospital.phone}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              N/A
                            </span>
                          )}
                        </TableCell>

                        <TableCell>
                          {hospital.rating ? (
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {renderStars(hospital.rating)}
                              </div>
                              <span className="text-sm font-medium">
                                {hospital.rating}
                              </span>
                              {hospital.totalReviews && (
                                <span className="text-xs text-muted-foreground">
                                  ({hospital.totalReviews})
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              No rating
                            </span>
                          )}
                        </TableCell>

                        <TableCell>
                          {hospital.type ? (
                            <Badge className={getTypeColor(hospital.type)}>
                              <Building2 className="h-3 w-3 mr-1" />
                              {hospital.type.charAt(0).toUpperCase() +
                                hospital.type.slice(1)}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              N/A
                            </span>
                          )}
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {hospital.verified ? (
                              <Badge
                                variant="secondary"
                                className="w-fit text-xs"
                              >
                                <Shield className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="w-fit text-xs"
                              >
                                Unverified
                              </Badge>
                            )}
                            {hospital.bedCount && (
                              <div className="text-xs text-muted-foreground">
                                {hospital.availableBeds || 0} /{" "}
                                {hospital.bedCount} beds
                              </div>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`/Hospitals/${hospital.slug}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/admin/hospitals/${hospital.id}/edit`}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteClick(hospital)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Hospital</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{hospitalToDelete?.name}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
