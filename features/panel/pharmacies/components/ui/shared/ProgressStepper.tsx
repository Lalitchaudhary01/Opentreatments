"use client"

export function ProgressStepper({
  steps,
  currentStep,
}: {
  steps: { id: number; title: string }[]
  currentStep: number
}) {
  return (
    <div className="flex gap-4">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex items-center gap-2 ${
            step.id === currentStep ? "font-bold text-blue-600" : ""
          }`}
        >
          <span className="h-6 w-6 rounded-full border text-center text-sm">
            {step.id + 1}
          </span>
          {step.title}
        </div>
      ))}
    </div>
  )
}