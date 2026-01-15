"use client";

export default function ProgressStepper({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      {steps.map((step, i) => {
        const active = i <= current;
        const text = typeof step === "string" ? step : step.label;

        return (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div
              className={`h-2 w-full rounded ${
                active ? "bg-[#00C6D2]" : "bg-muted"
              }`}
            />
            <span
              className={`mt-2 text-xs font-medium ${
                active ? "text-[#00C6D2]" : "text-muted-foreground"
              }`}
            >
              {text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
