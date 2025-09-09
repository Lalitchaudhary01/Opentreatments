"use client";

import { Button } from "@/components/ui/button";
import { useHospitalForm } from "../../hooks/useHospitalForm";
import StepBasicInfo from "./StepBasicInfo";
import StepFacilities from "./StepFacilities";
import StepServices from "./StepServices";
import StepInsurance from "./StepInsurance";
import StepDoctors from "./StepDoctors";
import StepProcedures from "./StepProcedures";
import { addHospital } from "../../actions/addHospital";

export default function HospitalForm() {
  const { step, formData, updateField, nextStep, prevStep, resetForm } =
    useHospitalForm();

  async function handleSubmit() {
    try {
      const payload = {
        ...formData,
        procedures: formData.procedures?.map((p) => ({
          name: p.name,
          description: p.description || null, // empty string → null
          cost: p.cost === "" || p.cost === undefined ? null : Number(p.cost), // string → number/null
          duration: p.duration || null,
        })),
      };

      await addHospital(payload);
      alert("✅ Hospital added successfully!");
      resetForm();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add hospital");
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      {step === 0 && (
        <StepBasicInfo formData={formData} updateField={updateField} />
      )}
      {step === 1 && (
        <StepFacilities formData={formData} updateField={updateField} />
      )}
      {step === 2 && (
        <StepServices formData={formData} updateField={updateField} />
      )}
      {step === 3 && (
        <StepInsurance formData={formData} updateField={updateField} />
      )}
      {step === 4 && (
        <StepDoctors formData={formData} updateField={updateField} />
      )}
      {step === 5 && (
        <StepProcedures formData={formData} updateField={updateField} />
      )}

      <div className="flex justify-between mt-6">
        {step > 0 && (
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
        )}
        {step < 5 && <Button onClick={nextStep}>Next</Button>}
        {step === 5 && (
          <Button onClick={handleSubmit} className="bg-blue-600 text-white">
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}