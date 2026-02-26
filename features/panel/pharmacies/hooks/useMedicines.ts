"use client"

import { useEffect, useState } from "react"
import {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  searchMedicines,
} from "../actions"

export function useMedicines() {
  const [medicines, setMedicines] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await getMedicines()
      setMedicines(data)
      setLoading(false)
    }
    load()
  }, [])

  async function add(data: any) {
    const result = await addMedicine(data)
    setMedicines((prev) => [result, ...prev])
  }

  async function update(id: string, data: any) {
    const updated = await updateMedicine(id, data)
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? updated : m))
    )
  }

  async function remove(id: string) {
    await deleteMedicine(id)
    setMedicines((prev) => prev.filter((m) => m.id !== id))
  }

  async function search(pharmacyId: string, query: string) {
    const results = await searchMedicines(pharmacyId, query)
    setMedicines(results)
  }

  return { medicines, loading, add, update, remove, search }
}