"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitHospitalProfile } from "../actions/submitHospitalProfile";
import { updateHospitalProfile } from "../actions/updateHospitalProfile";

// ------------------- Schema -------------------
const doctorSchema = z.object({
  name: z.string().min(2),
  specialization: z.string().min(2),
  experience: z.coerce.number().optional(),
  profilePic: z.string().url().optional(),
});

const procedureSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  cost: z.coerce.number().optional(),
  duration: z.string().optional(),
});

const serviceSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  cost: z.coerce.number().optional(),
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
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  logo: z.string().url().optional(),
  image: z.string().url().optional(),

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
        await submitHospitalProfile(values);
      }
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic hospital info */}
      <Input placeholder="Hospital Name" {...form.register("name")} />
      <Input placeholder="Address" {...form.register("address")} />
      <Input placeholder="City" {...form.register("city")} />
      <Input placeholder="State" {...form.register("state")} />
      <Input placeholder="Country" {...form.register("country")} />
      <Input placeholder="Phone" {...form.register("phone")} />
      <Input placeholder="Email" {...form.register("email")} />
      <Input placeholder="Website" {...form.register("website")} />
      <Input placeholder="Logo URL" {...form.register("logo")} />
      <Input placeholder="Image URL" {...form.register("image")} />

      {/* Doctors Section */}
      <div>
        <h3 className="font-semibold">Doctors</h3>
        {doctors.fields.map((field, index) => (
          <div key={field.id} className="space-y-2 border p-2 rounded">
            <Input
              placeholder="Name"
              {...form.register(`doctors.${index}.name`)}
            />
            <Input
              placeholder="Specialization"
              {...form.register(`doctors.${index}.specialization`)}
            />
            <Input
              type="number"
              placeholder="Experience (years)"
              {...form.register(`doctors.${index}.experience`)}
            />
            <Input
              placeholder="Profile Picture URL"
              {...form.register(`doctors.${index}.profilePic`)}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => doctors.remove(index)}
            >
              Remove Doctor
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => doctors.append({ name: "", specialization: "" })}
        >
          + Add Doctor
        </Button>
      </div>

      {/* Procedures Section */}
      <div>
        <h3 className="font-semibold">Procedures</h3>
        {procedures.fields.map((field, index) => (
          <div key={field.id} className="space-y-2 border p-2 rounded">
            <Input
              placeholder="Name"
              {...form.register(`procedures.${index}.name`)}
            />
            <Textarea
              placeholder="Description"
              {...form.register(`procedures.${index}.description`)}
            />
            <Input
              type="number"
              placeholder="Cost"
              {...form.register(`procedures.${index}.cost`)}
            />
            <Input
              placeholder="Duration"
              {...form.register(`procedures.${index}.duration`)}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => procedures.remove(index)}
            >
              Remove Procedure
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => procedures.append({ name: "" })}>
          + Add Procedure
        </Button>
      </div>

      {/* Services Section */}
      <div>
        <h3 className="font-semibold">Services</h3>
        {services.fields.map((field, index) => (
          <div key={field.id} className="space-y-2 border p-2 rounded">
            <Input
              placeholder="Name"
              {...form.register(`services.${index}.name`)}
            />
            <Textarea
              placeholder="Description"
              {...form.register(`services.${index}.description`)}
            />
            <Input
              type="number"
              placeholder="Cost"
              {...form.register(`services.${index}.cost`)}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => services.remove(index)}
            >
              Remove Service
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => services.append({ name: "" })}>
          + Add Service
        </Button>
      </div>

      {/* Facilities Section */}
      <div>
        <h3 className="font-semibold">Facilities</h3>
        {facilities.fields.map((field, index) => (
          <div key={field.id} className="space-y-2 border p-2 rounded">
            <Input
              placeholder="Name"
              {...form.register(`facilities.${index}.name`)}
            />
            <Textarea
              placeholder="Description"
              {...form.register(`facilities.${index}.description`)}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => facilities.remove(index)}
            >
              Remove Facility
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => facilities.append({ name: "" })}>
          + Add Facility
        </Button>
      </div>

      {/* Insurances Section */}
      <div>
        <h3 className="font-semibold">Insurances</h3>
        {insurances.fields.map((field, index) => (
          <div key={field.id} className="space-y-2 border p-2 rounded">
            <Input
              placeholder="Name"
              {...form.register(`insurances.${index}.name`)}
            />
            <Input
              placeholder="Provider"
              {...form.register(`insurances.${index}.provider`)}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...form.register(`insurances.${index}.cashless`)}
              />
              Cashless Available
            </label>
            <Button
              type="button"
              variant="destructive"
              onClick={() => insurances.remove(index)}
            >
              Remove Insurance
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => insurances.append({ name: "" })}>
          + Add Insurance
        </Button>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update Profile" : "Submit Profile"}
      </Button>
    </form>
  );
}
