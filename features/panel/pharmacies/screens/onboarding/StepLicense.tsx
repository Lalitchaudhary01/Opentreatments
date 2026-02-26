"use client"

export function StepLicense({
  formData,
  setFormData,
}: {
  formData: any
  setFormData: (data: any) => void
}) {
  return (
    <div className="space-y-4">
      <input
        placeholder="License Number"
        value={formData.licenseNumber || ""}
        onChange={(e) =>
          setFormData({ ...formData, licenseNumber: e.target.value })
        }
        className="w-full rounded border p-2"
      />

      <input
        placeholder="GST Number"
        value={formData.gstNumber || ""}
        onChange={(e) =>
          setFormData({ ...formData, gstNumber: e.target.value })
        }
        className="w-full rounded border p-2"
      />
    </div>
  )
}