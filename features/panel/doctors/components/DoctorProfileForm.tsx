"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitDoctorProfile } from "../actions/submitDoctorProfile";

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  specialization: z.string().min(2, "Specialization required"),
  specialties: z.string().optional(), // comma-separated input → split later
  experience: z.number().optional(),
  gender: z.string().optional(),
  profilePic: z.string().url().optional(),
  fees: z.number().optional(),
  languages: z.string().optional(), // comma-separated input → split later
  city: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function DoctorProfileForm({
  initialData,
}: {
  initialData?: Partial<ProfileFormValues>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData || {},
  });

  async function onSubmit(values: ProfileFormValues) {
    setLoading(true);
    try {
      await submitDoctorProfile({
        ...values,
        specialties: values.specialties
          ? values.specialties.split(",").map((s) => s.trim())
          : [],
        languages: values.languages
          ? values.languages.split(",").map((l) => l.trim())
          : [],
      });
      router.push("/doctor/profile/view");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl mx-auto"
    >
      <Input placeholder="Name" {...form.register("name")} />
      <Input
        placeholder="Specialization"
        {...form.register("specialization")}
      />
      <Input
        placeholder="Specialties (comma separated)"
        {...form.register("specialties")}
      />
      <Input
        type="number"
        placeholder="Experience (years)"
        {...form.register("experience", { valueAsNumber: true })}
      />
      <Input placeholder="Gender" {...form.register("gender")} />
      <Input
        placeholder="Profile Picture URL"
        {...form.register("profilePic")}
      />
      <Input
        type="number"
        step="0.01"
        placeholder="Consultation Fees"
        {...form.register("fees", { valueAsNumber: true })}
      />
      <Input
        placeholder="Languages (comma separated)"
        {...form.register("languages")}
      />
      <Input placeholder="City" {...form.register("city")} />
      <Textarea
        placeholder="Availability (JSON)"
        {...form.register("availability")}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
