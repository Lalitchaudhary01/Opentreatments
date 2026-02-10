interface Step {
  key: string;
  title: string;
}

interface Props {
  steps: Step[];
  active: number;
}

export function ProgressStepper({ steps, active }: Props) {
  return (
    <div className="flex items-center gap-4">
      {steps.map((s, i) => {
        const done = i < active;
        const isActive = i === active;

        return (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${
                done
                  ? "bg-green-500 text-white"
                  : isActive
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm ${
                isActive ? "font-medium" : "text-muted-foreground"
              }`}
            >
              {s.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
