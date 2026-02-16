"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { submitHospitalProfile } from "../actions/submitHospitalProfile";
import { updateHospitalProfile } from "../actions/updateHospitalProfile";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Image as ImageIcon,
  Users,
  Stethoscope,
  Heart,
  Shield,
  Plus,
  Trash2,
  Save,
  Building,
} from "lucide-react";

// ------------------- Schema -------------------
const doctorSchema = z.object({
  name: z.string().min(2),
  specialization: z.string().min(2),
  experience: z.union([z.number(), z.undefined()]).optional(),
  profilePic: z.string().url().optional(),
});

const procedureSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  cost: z.union([z.number(), z.undefined()]).optional(),
  duration: z.string().optional(),
});

const serviceSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  cost: z.union([z.number(), z.undefined()]).optional(),
});

const facilitySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
});

const insuranceSchema = z.object({
  name: z.string().min(2),
  provider: z.string().optional(),
  cashless: z.boolean().optional(),
});

const schema = z.object({
  name: z.string().min(2),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().min(1),
  website: z.string().url().optional().or(z.literal("")),
  logo: z.string().url().optional().or(z.literal("")),
  image: z.string().url().optional().or(z.literal("")),

  doctors: z.array(doctorSchema).optional(),
  procedures: z.array(procedureSchema).optional(),
  services: z.array(serviceSchema).optional(),
  facilities: z.array(facilitySchema).optional(),
  insurances: z.array(insuranceSchema).optional(),
});

type FormValues = z.infer<typeof schema>;

// ------------------- Component -------------------
export function HospitalProfileForm({
  defaultValues,
  isEdit = false,
}: {
  defaultValues?: Partial<FormValues>;
  isEdit?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // field arrays for dynamic sections
  const doctors = useFieldArray({ control: form.control, name: "doctors" });
  const procedures = useFieldArray({
    control: form.control,
    name: "procedures",
  });
  const services = useFieldArray({ control: form.control, name: "services" });
  const facilities = useFieldArray({
    control: form.control,
    name: "facilities",
  });
  const insurances = useFieldArray({
    control: form.control,
    name: "insurances",
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      if (isEdit) {
        await updateHospitalProfile(values);
      } else {
        await submitHospitalProfile({
          ...values,
          doctors: values.doctors || [],
          procedures: values.procedures || [],
          services: values.services || [],
          facilities: values.facilities || [],
          insurances: values.insurances || [],
          website: values.website || undefined,
          logo: values.logo || undefined,
          image: values.image || undefined,
        });
      }
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-lg bg-black p-2">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? "Update Hospital Profile" : "Create Hospital Profile"}
            </h1>
          </div>
          <p className="text-gray-600 ml-12">
            Fill in the details to {isEdit ? "update" : "create"} your hospital
            profile
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card className="border-2 border-gray-900">
            <CardHeader className="border-b border-gray-200 bg-gray-50">
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Essential details about your hospital
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Building2 className="h-4 w-4" />
                    Hospital Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter hospital name"
                    {...form.register("name")}
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    {...form.register("phone")}
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    {...form.register("email")}
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="website"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    Website
                  </Label>
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    {...form.register("website")}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  Address *
                </Label>
                <Textarea
                  id="address"
                  placeholder="Enter full address"
                  {...form.register("address")}
                  className="border-gray-300 min-h-20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">
                    City *
                  </Label>
                  <Input
                    id="city"
                    placeholder="City"
                    {...form.register("city")}
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium">
                    State *
                  </Label>
                  <Input
                    id="state"
                    placeholder="State"
                    {...form.register("state")}
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm font-medium">
                    Country *
                  </Label>
                  <Input
                    id="country"
                    placeholder="Country"
                    {...form.register("country")}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="logo"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Logo URL
                  </Label>
                  <Input
                    id="logo"
                    placeholder="https://example.com/logo.png"
                    {...form.register("logo")}
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="image"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Cover Image URL
                  </Label>
                  <Input
                    id="image"
                    placeholder="https://example.com/image.png"
                    {...form.register("image")}
                    className="border-gray-300"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Doctors Section */}
          <Card className="border-2 border-gray-900">
            <CardHeader className="border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Doctors
                  </CardTitle>
                  <CardDescription>
                    Add doctors working at your hospital
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {doctors.fields.length} Added
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {doctors.fields.map((field, index) => (
                <Card
                  key={field.id}
                  className="border-2 border-gray-300 bg-gray-50"
                >
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">
                        Doctor #{index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => doctors.remove(index)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Name *</Label>
                        <Input
                          placeholder="Dr. John Doe"
                          {...form.register(`doctors.${index}.name`)}
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Specialization *
                        </Label>
                        <Input
                          placeholder="Cardiology"
                          {...form.register(`doctors.${index}.specialization`)}
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Experience (years)
                        </Label>
                        <Input
                          type="number"
                          placeholder="5"
                          {...form.register(`doctors.${index}.experience`, {
                            valueAsNumber: true,
                          })}
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Profile Picture URL
                        </Label>
                        <Input
                          placeholder="https://example.com/doctor.jpg"
                          {...form.register(`doctors.${index}.profilePic`)}
                          className="border-gray-300"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => doctors.append({ name: "", specialization: "" })}
                className="w-full border-2 border-gray-900 hover:bg-gray-900 hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Doctor
              </Button>
            </CardContent>
          </Card>

          {/* Procedures Section */}
          <Card className="border-2 border-gray-900">
            <CardHeader className="border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" />
                    Procedures
                  </CardTitle>
                  <CardDescription>Medical procedures offered</CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {procedures.fields.length} Added
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {procedures.fields.map((field, index) => (
                <Card
                  key={field.id}
                  className="border-2 border-gray-300 bg-gray-50"
                >
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">
                        Procedure #{index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => procedures.remove(index)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Name *</Label>
                        <Input
                          placeholder="Heart Surgery"
                          {...form.register(`procedures.${index}.name`)}
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Description
                        </Label>
                        <Textarea
                          placeholder="Detailed description of the procedure"
                          {...form.register(`procedures.${index}.description`)}
                          className="border-gray-300 min-h-20"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Cost</Label>
                          <Input
                            type="number"
                            placeholder="50000"
                            {...form.register(`procedures.${index}.cost`, {
                              valueAsNumber: true,
                            })}
                            className="border-gray-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Duration
                          </Label>
                          <Input
                            placeholder="2-3 hours"
                            {...form.register(`procedures.${index}.duration`)}
                            className="border-gray-300"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => procedures.append({ name: "" })}
                className="w-full border-2 border-gray-900 hover:bg-gray-900 hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Procedure
              </Button>
            </CardContent>
          </Card>

          {/* Services Section */}
          <Card className="border-2 border-gray-900">
            <CardHeader className="border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Services
                  </CardTitle>
                  <CardDescription>Medical services provided</CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {services.fields.length} Added
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {services.fields.map((field, index) => (
                <Card
                  key={field.id}
                  className="border-2 border-gray-300 bg-gray-50"
                >
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">
                        Service #{index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => services.remove(index)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Name *</Label>
                        <Input
                          placeholder="24/7 Emergency Care"
                          {...form.register(`services.${index}.name`)}
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Description
                        </Label>
                        <Textarea
                          placeholder="Service description"
                          {...form.register(`services.${index}.description`)}
                          className="border-gray-300 min-h-20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Cost</Label>
                        <Input
                          type="number"
                          placeholder="1000"
                          {...form.register(`services.${index}.cost`, {
                            valueAsNumber: true,
                          })}
                          className="border-gray-300"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => services.append({ name: "" })}
                className="w-full border-2 border-gray-900 hover:bg-gray-900 hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </CardContent>
          </Card>

          {/* Facilities Section */}
          <Card className="border-2 border-gray-900">
            <CardHeader className="border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Facilities
                  </CardTitle>
                  <CardDescription>
                    Available facilities at your hospital
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {facilities.fields.length} Added
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {facilities.fields.map((field, index) => (
                <Card
                  key={field.id}
                  className="border-2 border-gray-300 bg-gray-50"
                >
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">
                        Facility #{index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => facilities.remove(index)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Name *</Label>
                        <Input
                          placeholder="ICU Ward"
                          {...form.register(`facilities.${index}.name`)}
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Description
                        </Label>
                        <Textarea
                          placeholder="Facility details"
                          {...form.register(`facilities.${index}.description`)}
                          className="border-gray-300 min-h-20"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => facilities.append({ name: "" })}
                className="w-full border-2 border-gray-900 hover:bg-gray-900 hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Facility
              </Button>
            </CardContent>
          </Card>

          {/* Insurances Section */}
          <Card className="border-2 border-gray-900">
            <CardHeader className="border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Insurances
                  </CardTitle>
                  <CardDescription>
                    Accepted insurance providers
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {insurances.fields.length} Added
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {insurances.fields.map((field, index) => (
                <Card
                  key={field.id}
                  className="border-2 border-gray-300 bg-gray-50"
                >
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">
                        Insurance #{index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => insurances.remove(index)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Name *</Label>
                          <Input
                            placeholder="Star Health Insurance"
                            {...form.register(`insurances.${index}.name`)}
                            className="border-gray-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Provider
                          </Label>
                          <Input
                            placeholder="Star Health"
                            {...form.register(`insurances.${index}.provider`)}
                            className="border-gray-300"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`cashless-${index}`}
                          {...form.register(`insurances.${index}.cashless`)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label
                          htmlFor={`cashless-${index}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          Cashless Available
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => insurances.append({ name: "" })}
                className="w-full border-2 border-gray-900 hover:bg-gray-900 hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Insurance
              </Button>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card className="border-2 border-gray-900 bg-gray-50">
            <CardContent className="pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white h-12 text-lg font-semibold"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    {isEdit ? "Update Profile" : "Submit Profile"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
