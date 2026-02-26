"use client"

import { useEffect, useState } from "react"
import {
  getPharmacyProfile,
  submitPharmacyProfile,
  updatePharmacyProfile,
} from "../actions"

export function usePharmacyProfile() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getPharmacyProfile()
        setProfile(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  async function submit(data: any) {
    setLoading(true)
    try {
      const result = await submitPharmacyProfile(data)
      setProfile(result)
      return result
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function update(data: any) {
    setLoading(true)
    try {
      const result = await updatePharmacyProfile(data)
      setProfile(result)
      return result
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { profile, loading, error, submit, update }
}