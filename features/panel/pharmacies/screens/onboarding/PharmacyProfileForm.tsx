"use client"

import { usePharmacyProfile } from "../../hooks"



export function PharmacyProfileForm() {
  const { submit } = usePharmacyProfile()

  async function handleSubmit(e: any) {
    e.preventDefault()

    const formData = new FormData(e.target)

    await submit({
      name: formData.get("name"),
      ownerName: formData.get("ownerName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      country: formData.get("country"),
      licenseNumber: formData.get("licenseNumber"),
      gstNumber: formData.get("gstNumber"),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Pharmacy Name" className="input" />
      <input name="ownerName" placeholder="Owner Name" className="input" />
      <input name="email" placeholder="Email" className="input" />
      <input name="phone" placeholder="Phone" className="input" />
      <input name="address" placeholder="Address" className="input" />
      <input name="city" placeholder="City" className="input" />
      <input name="state" placeholder="State" className="input" />
      <input name="country" placeholder="Country" className="input" />
      <input name="licenseNumber" placeholder="License Number" className="input" />
      <input name="gstNumber" placeholder="GST Number" className="input" />

      <button className="rounded bg-blue-600 px-4 py-2 text-white">
        Submit
      </button>
    </form>
  )
}