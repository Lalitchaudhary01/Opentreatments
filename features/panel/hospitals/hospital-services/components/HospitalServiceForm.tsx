"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HospitalService } from "../types/hospitalServices";

const formSchema = z.object({
  name: z.string().min(2, "Service name required"),
  cost: z.union([z.number(), z.undefined()]).optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface HospitalServiceFormProps {
  initialData?: HospitalService | null;
  onSubmit: (data: FormData) => void;
  onCancel?: () => void;
}

export default function HospitalServiceForm({
  initialData,
  onSubmit,
  onCancel,
}: HospitalServiceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          cost: initialData.cost ?? undefined,
          description: initialData.description ?? undefined,
        }
      : { name: "", cost: undefined, description: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <Input placeholder="Service Name" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input type="number" placeholder="Cost" {...register("cost")} />
        {errors.cost && (
          <p className="text-sm text-red-500">{errors.cost.message}</p>
        )}
      </div>

      <div>
        <Textarea placeholder="Description" {...register("description")} />
      </div>

      <div className="flex gap-2">
        <Button type="submit">{initialData ? "Update" : "Add"} Service</Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
