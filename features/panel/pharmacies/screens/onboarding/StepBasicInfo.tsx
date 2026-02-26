"use client"

export function StepBasicInfo({
  formData,
  setFormData,
}: {
  formData: any
  setFormData: (data: any) => void
}) {
  return (
    <div className="space-y-4">
      <input
        placeholder="Pharmacy Name"
        value={formData.name || ""}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
        className="w-full rounded border p-2"
      />

      <input
        placeholder="Owner Name"
        value={formData.ownerName || ""}
        onChange={(e) =>
          setFormData({ ...formData, ownerName: e.target.value })
        }
        className="w-full rounded border p-2"
      />

      <input
        placeholder="Email"
        value={formData.email || ""}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        className="w-full rounded border p-2"
      />

      <input
        placeholder="Phone"
        value={formData.phone || ""}
        onChange={(e) =>
          setFormData({ ...formData, phone: e.target.value })
        }
        className="w-full rounded border p-2"
      />
    </div>
  )
}