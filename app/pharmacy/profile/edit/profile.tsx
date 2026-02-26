"use client"

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"
import { getPharmacyProfile, updatePharmacyProfile } from "@/features/panel/pharmacies"

export default function EditProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getPharmacyProfile()
        if (!data) {
          router.push("/pharmacies/onboarding")
          return
        }
        setFormData(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [router])

  const handleSubmit = async () => {
    try {
      setSaving(true)
      await updatePharmacyProfile(formData)
      router.push("/pharmacies/profile")
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-6">Loading...</div>
  if (!formData) return null

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Edit Pharmacy Profile</h1>

      <div className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          value={formData.name || ""}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          placeholder="Pharmacy Name"
        />

        <input
          className="w-full border p-2 rounded"
          value={formData.ownerName || ""}
          onChange={(e) =>
            setFormData({ ...formData, ownerName: e.target.value })
          }
          placeholder="Owner Name"
        />

        <input
          className="w-full border p-2 rounded"
          value={formData.email || ""}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          placeholder="Email"
        />

        <input
          className="w-full border p-2 rounded"
          value={formData.phone || ""}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          placeholder="Phone"
        />

        <input
          className="w-full border p-2 rounded"
          value={formData.address || ""}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="Address"
        />

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  )
}