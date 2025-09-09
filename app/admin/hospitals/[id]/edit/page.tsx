"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getHospitalById } from "@/features/admin/hospitals/actions/getHospitalById";
import { updateHospital } from "@/features/admin/hospitals/actions/updateHospital";
import type { Hospital } from "@/features/admin/hospitals/types/hospital";
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Stethoscope,
  CreditCard,
  Activity,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  type: string;
  verified: boolean;
  emergencyAvailable: boolean;
  bedCount: number;
  availableBeds: number;
  rating: number;
  totalReviews: number;
  logo: string;
  image: string;
  facilities: Array<{ id?: string; name: string }>;
  services: Array<{
    id?: string;
    name: string;
    description?: string;
    cost?: number;
  }>;
  doctors: Array<{
    id?: string;
    name: string;
    specialization: string;
    experience?: number;
  }>;
  procedures: Array<{
    id?: string;
    name: string;
    description?: string;
    cost?: number;
    duration?: string;
  }>;
  insurances: Array<{
    id?: string;
    name: string;
    provider?: string;
    cashless: boolean;
  }>;
}

export default function HospitalEditPage() {
  const params = useParams();
  const router = useRouter();
  const hospitalId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
    website: "",
    type: "",
    verified: false,
    emergencyAvailable: false,
    bedCount: 0,
    availableBeds: 0,
    rating: 0,
    totalReviews: 0,
    logo: "",
    image: "",
    facilities: [],
    services: [],
    doctors: [],
    procedures: [],
    insurances: [],
  });

  useEffect(() => {
    async function fetchHospital() {
      try {
        const data = await getHospitalById(hospitalId);
        setFormData({
          name: data.name || "",
          description: data.description || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          phone: data.phone || "",
          email: data.email || "",
          website: data.website || "",
          type: data.type || "",
          verified: data.verified || false,
          emergencyAvailable: data.emergencyAvailable || false,
          bedCount: data.bedCount || 0,
          availableBeds: data.availableBeds || 0,
          rating: data.rating || 0,
          totalReviews: data.totalReviews || 0,
          logo: data.logo || "",
          image: data.image || "",
          facilities: data.facilities || [],
          services: data.services || [],
          doctors: data.doctors || [],
          procedures: data.procedures || [],
          insurances: data.insurances || [],
        });
      } catch (err) {
        console.error("Failed to fetch hospital:", err);
        toast.error("Failed to load hospital data");
      } finally {
        setLoading(false);
      }
    }
    fetchHospital();
  }, [hospitalId]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayAdd = (
    field: "facilities" | "services" | "doctors" | "procedures" | "insurances"
  ) => {
    const newItem = {
      facilities: { name: "" },
      services: { name: "", description: "", cost: 0 },
      doctors: { name: "", specialization: "", experience: 0 },
      procedures: { name: "", description: "", cost: 0, duration: "" },
      insurances: { name: "", provider: "", cashless: false },
    };

    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], newItem[field]],
    }));
  };

  const handleArrayUpdate = (
    field: "facilities" | "services" | "doctors" | "procedures" | "insurances",
    index: number,
    key: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const handleArrayRemove = (
    field: "facilities" | "services" | "doctors" | "procedures" | "insurances",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateHospital(hospitalId, formData);
      toast.success("Hospital updated successfully!");
      router.push(`/admin/hospitals/${hospitalId}`);
    } catch (error) {
      console.error("Failed to update hospital:", error);
      toast.error("Failed to update hospital");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <div className="text-muted-foreground">
                Loading hospital data...
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button type="button" variant="outline" size="sm" asChild>
              <Link href={`/admin/hospitals/${hospitalId}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Details
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Edit Hospital</h1>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" asChild>
              <Link href={`/admin/hospitals/${hospitalId}`}>Cancel</Link>
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Hospital Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Hospital Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="semi-private">Semi-Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={formData.logo}
                    onChange={(e) => handleInputChange("logo", e.target.value)}
                    placeholder="https://example.com/logo.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Status & Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Status & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="verified">Verified Hospital</Label>
                  <Switch
                    id="verified"
                    checked={formData.verified}
                    onCheckedChange={(checked) =>
                      handleInputChange("verified", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="emergency">24/7 Emergency</Label>
                  <Switch
                    id="emergency"
                    checked={formData.emergencyAvailable}
                    onCheckedChange={(checked) =>
                      handleInputChange("emergencyAvailable", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedCount">Total Beds</Label>
                    <Input
                      id="bedCount"
                      type="number"
                      value={formData.bedCount}
                      onChange={(e) =>
                        handleInputChange(
                          "bedCount",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availableBeds">Available Beds</Label>
                    <Input
                      id="availableBeds"
                      type="number"
                      value={formData.availableBeds}
                      onChange={(e) =>
                        handleInputChange(
                          "availableBeds",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) =>
                        handleInputChange(
                          "rating",
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalReviews">Total Reviews</Label>
                    <Input
                      id="totalReviews"
                      type="number"
                      value={formData.totalReviews}
                      onChange={(e) =>
                        handleInputChange(
                          "totalReviews",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Contact & Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    placeholder="https://hospital-website.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Facilities
                  </CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleArrayAdd("facilities")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Facility
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {formData.facilities.map((facility, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={facility.name}
                      onChange={(e) =>
                        handleArrayUpdate(
                          "facilities",
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Facility name"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleArrayRemove("facilities", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" />
                    Services
                  </CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleArrayAdd("services")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.services.map((service, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={service.name}
                        onChange={(e) =>
                          handleArrayUpdate(
                            "services",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Service name"
                      />
                      <Input
                        type="number"
                        value={service.cost || ""}
                        onChange={(e) =>
                          handleArrayUpdate(
                            "services",
                            index,
                            "cost",
                            parseInt(e.target.value) || null
                          )
                        }
                        placeholder="Cost (₹)"
                        className="w-32"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleArrayRemove("services", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      value={service.description || ""}
                      onChange={(e) =>
                        handleArrayUpdate(
                          "services",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Service description"
                      rows={2}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Doctors */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Doctors
                  </CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleArrayAdd("doctors")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Doctor
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.doctors.map((doctor, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Input
                        value={doctor.name}
                        onChange={(e) =>
                          handleArrayUpdate(
                            "doctors",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Doctor name"
                      />
                      <Input
                        value={doctor.specialization}
                        onChange={(e) =>
                          handleArrayUpdate(
                            "doctors",
                            index,
                            "specialization",
                            e.target.value
                          )
                        }
                        placeholder="Specialization"
                      />
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={doctor.experience || ""}
                          onChange={(e) =>
                            handleArrayUpdate(
                              "doctors",
                              index,
                              "experience",
                              parseInt(e.target.value) || null
                            )
                          }
                          placeholder="Experience (years)"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleArrayRemove("doctors", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Procedures */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Procedures
                  </CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleArrayAdd("procedures")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Procedure
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.procedures.map((procedure, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Input
                        value={procedure.name}
                        onChange={(e) =>
                          handleArrayUpdate(
                            "procedures",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Procedure name"
                      />
                      <Input
                        type="number"
                        value={procedure.cost || ""}
                        onChange={(e) =>
                          handleArrayUpdate(
                            "procedures",
                            index,
                            "cost",
                            parseInt(e.target.value) || null
                          )
                        }
                        placeholder="Cost (₹)"
                      />
                      <div className="flex gap-2">
                        <Input
                          value={procedure.duration || ""}
                          onChange={(e) =>
                            handleArrayUpdate(
                              "procedures",
                              index,
                              "duration",
                              e.target.value
                            )
                          }
                          placeholder="Duration"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleArrayRemove("procedures", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={procedure.description || ""}
                      onChange={(e) =>
                        handleArrayUpdate(
                          "procedures",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Procedure description"
                      rows={2}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Insurance */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Insurance Partners
                  </CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleArrayAdd("insurances")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Insurance
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.insurances.map((insurance, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <Input
                        value={insurance.name}
                        onChange={(e) =>
                          handleArrayUpdate(
                            "insurances",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Insurance name"
                      />
                      <Input
                        value={insurance.provider || ""}
                        onChange={(e) =>
                          handleArrayUpdate(
                            "insurances",
                            index,
                            "provider",
                            e.target.value
                          )
                        }
                        placeholder="Provider"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={insurance.cashless}
                          onCheckedChange={(checked) =>
                            handleArrayUpdate(
                              "insurances",
                              index,
                              "cashless",
                              checked
                            )
                          }
                        />
                        <Label>Cashless Available</Label>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleArrayRemove("insurances", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
