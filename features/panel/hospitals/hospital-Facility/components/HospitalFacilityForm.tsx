"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HospitalFacility } from "../types/hospitalFacility";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
});

type FacilityFormValues = z.infer<typeof schema>;

interface Props {
  defaultValues?: HospitalFacility;
  onSubmit: (values: FacilityFormValues) => Promise<void>;
  onCancel: () => void;
}

export default function HospitalFacilityForm({
  defaultValues,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FacilityFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Facility Name" {...register("name")} />
      {errors.name && (
        <p className="text-sm text-red-500">{errors.name.message}</p>
      )}

      <Textarea
        placeholder="Description (optional)"
        {...register("description")}
      />

      <div className="flex gap-2">
        <Button type="submit">{defaultValues ? "Update" : "Add"}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
