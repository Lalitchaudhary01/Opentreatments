"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitHospitalProfile } from "../actions/submitHospitalProfile";
import { updateHospitalProfile } from "../actions/updateHospitalProfile";

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
});

type FormValues = z.infer<typeof schema>;

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update Profile" : "Submit Profile"}
      </Button>
    </form>
  );
}
