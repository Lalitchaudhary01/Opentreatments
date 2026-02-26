"use client"

import { useEffect, useState } from "react"
import { useInventory } from "../../hooks"


export function PharmacyDashboard() {
  const { inventory, getInventory, deleteStock } = useInventory()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      await getInventory()
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div>Loading inventory...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Inventory</h1>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Medicine</th>
              <th className="p-3 text-left">Batch</th>
              <th className="p-3 text-left">Expiry</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory?.map((item: any) => {
              const isExpired =
                new Date(item.expiryDate) < new Date()

              return (
                <tr
                  key={item.id}
                  className={`border-t ${
                    isExpired ? "bg-red-50" : ""
                  }`}
                >
                  <td className="p-3">{item.medicine?.name}</td>
                  <td className="p-3">{item.batchNumber}</td>
                  <td className="p-3">
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteStock(item.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}