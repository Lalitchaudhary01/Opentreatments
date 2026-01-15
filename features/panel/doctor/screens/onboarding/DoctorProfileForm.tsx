"use client";

import dynamic from "next/dynamic";
import { useOnboarding } from "@/features/panel/doctor/hooks/useOnboarding";
import { ProgressStepper } from "../../components/ui/shared";
import { onboardingSteps } from "@/features/panel/doctor/constants";
import { Button } from "@/components/ui/button";

const StepPersonalInfo = dynamic(() => import("./StepPersonalInfo"));
const StepProfessional = dynamic(() => import("./StepProfessional"));
const StepClinic = dynamic(() => import("./StepClinic"));
const StepAvailability = dynamic(() => import("./StepAvailability"));
const StepVerification = dynamic(() => import("./StepVerification"));

const stepsMap = [
  StepPersonalInfo,
  StepProfessional,
  StepClinic,
  StepAvailability,
  StepVerification,
];

export default function DoctorProfileForm() {
  const { step, data, setData, next, back, isLast, isFirst, loading } =
    useOnboarding();

  const StepComponent = stepsMap[step];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <ProgressStepper steps={onboardingSteps} current={step} />

      <div className="rounded-2xl border p-6 bg-white/60">
        <StepComponent data={data} setData={setData} />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" disabled={isFirst || loading} onClick={back}>
          Back
        </Button>

        <Button onClick={next} disabled={loading}>
          {loading ? "Submitting..." : isLast ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}
