"use client"

import { useState } from "react"

export function useOnboarding() {
  const [step, setStep] = useState(0)

  function next() {
    setStep((prev) => prev + 1)
  }

  function back() {
    setStep((prev) => Math.max(prev - 1, 0))
  }

  function goTo(index: number) {
    setStep(index)
  }

  return { step, next, back, goTo }
}