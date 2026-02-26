"use client"

export function MedicineRow({
  name,
  quantity,
}: {
  name: string
  quantity: number
}) {
  return (
    <div className="flex justify-between border-b py-2">
      <span>{name}</span>
      <span>{quantity}</span>
    </div>
  )
}