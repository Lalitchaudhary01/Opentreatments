"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  MapPin,
  Users,
  Stethoscope,
  Activity,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

// Import step components
import Step1BasicInfo from "./Step1BasicInfo";
import Step2LocationContact from "./Step2LocationContact";
import Step3SettingsCapacity from "./Step3SettingsCapacity";
import Step4FacilitiesServices from "./Step4FacilitiesServices";
import Step5MedicalStaff from "./Step5MedicalStaff";
import Step6ProceduresInsurance from "./Step6ProceduresInsurance";
import { addHospital } from "../../actions/addHospital";

// Import the addHospital action

// Types based on your addHospital action
interface HospitalFormData {
  // Basic Info
  name: string;
  description: string;
  type: string;
  logo: string;
  image: string;

  // Location & Contact
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  website: string;

  // Settings & Status
  verified: boolean;
  emergencyAvailable: boolean;
  bedCount: number;
  availableBeds: number;
  rating: number;
  totalReviews: number;

  // Related Data
  facilities: Array<{ name: string; description?: string }>;
  services: Array<{ name: string; description?: string; cost?: number }>;
  doctors: Array<{
    name: string;
    specialization: string;
    experience?: number;
    profilePic?: string;
  }>;
  procedures: Array<{
    name: string;
    description?: string;
    cost?: number;
    duration?: string;
  }>;
  insurances: Array<{
    name: string;
    provider?: string;
    cashless: boolean;
  }>;
}

const initialFormData: HospitalFormData = {
  name: "",
  description: "",
  type: "",
  logo: "",
  image: "",
  address: "",
  city: "",
  state: "",
  country: "",
  phone: "",
  email: "",
  website: "",
  verified: false,
  emergencyAvailable: false,
  bedCount: 0,
  availableBeds: 0,
  rating: 0,
  totalReviews: 0,
  facilities: [],
  services: [],
  doctors: [],
  procedures: [],
  insurances: [],
};

const steps = [
  {
    id: 1,
    title: "Basic Information",
    description: "Hospital name, description and type",
    icon: Building2,
    fields: ["name", "description", "type", "logo", "image"],
  },
  {
    id: 2,
    title: "Location & Contact",
    description: "Address, phone, email and website",
    icon: MapPin,
    fields: [
      "address",
      "city",
      "state",
      "country",
      "phone",
      "email",
      "website",
    ],
  },
  {
    id: 3,
    title: "Settings & Capacity",
    description: "Status, beds and ratings",
    icon: Settings,
    fields: [
      "verified",
      "emergencyAvailable",
      "bedCount",
      "availableBeds",
      "rating",
      "totalReviews",
    ],
  },
  {
    id: 4,
    title: "Facilities & Services",
    description: "Available facilities and services",
    icon: Stethoscope,
    fields: ["facilities", "services"],
  },
  {
    id: 5,
    title: "Medical Staff",
    description: "Doctors and specialists",
    icon: Users,
    fields: ["doctors"],
  },
  {
    id: 6,
    title: "Procedures & Insurance",
    description: "Medical procedures and insurance partners",
    icon: Activity,
    fields: ["procedures", "insurances"],
  },
];

export default function AddHospitalWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<HospitalFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleInputChange = (field: keyof HospitalFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayAdd = (
    field: keyof Pick<
      HospitalFormData,
      "facilities" | "services" | "doctors" | "procedures" | "insurances"
    >
  ) => {
    const newItems = {
      facilities: { name: "", description: "" },
      services: { name: "", description: "", cost: 0 },
      doctors: { name: "", specialization: "", experience: 0, profilePic: "" },
      procedures: { name: "", description: "", cost: 0, duration: "" },
      insurances: { name: "", provider: "", cashless: false },
    };

    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], newItems[field]],
    }));
  };

  const handleArrayUpdate = (
    field: keyof Pick<
      HospitalFormData,
      "facilities" | "services" | "doctors" | "procedures" | "insurances"
    >,
    index: number,
    key: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const handleArrayRemove = (
    field: keyof Pick<
      HospitalFormData,
      "facilities" | "services" | "doctors" | "procedures" | "insurances"
    >,
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const validateStep = (stepId: number): boolean => {
    const step = steps.find((s) => s.id === stepId);
    if (!step) return false;

    // Check required fields for each step
    switch (stepId) {
      case 1:
        return formData.name.trim() !== "";
      case 2:
        return (
          formData.address.trim() !== "" &&
          formData.city.trim() !== "" &&
          formData.state.trim() !== "" &&
          formData.country.trim() !== ""
        );
      default:
        return true; // Other steps are optional
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    // Allow navigation to completed steps or next step
    if (
      completedSteps.includes(stepId) ||
      stepId === currentStep ||
      stepId === currentStep + 1
    ) {
      setCurrentStep(stepId);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast.error("Please complete all required fields");
      return;
    }

    setLoading(true);
    try {
      // Call your addHospital action
      const result = await addHospital(formData);

      toast.success("Hospital added successfully!");
      // Reset form or redirect
      setFormData(initialFormData);
      setCurrentStep(1);
      setCompletedSteps([]);
    } catch (error) {
      console.error("Failed to add hospital:", error);
      toast.error("Failed to add hospital. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo formData={formData} onChange={handleInputChange} />
        );

      case 2:
        return (
          <Step2LocationContact
            formData={formData}
            onChange={handleInputChange}
          />
        );

      case 3:
        return (
          <Step3SettingsCapacity
            formData={formData}
            onChange={handleInputChange}
          />
        );

      case 4:
        return (
          <Step4FacilitiesServices
            formData={formData}
            onArrayAdd={handleArrayAdd}
            onArrayUpdate={handleArrayUpdate}
            onArrayRemove={handleArrayRemove}
          />
        );

      case 5:
        return (
          <Step5MedicalStaff
            formData={formData}
            onArrayAdd={handleArrayAdd}
            onArrayUpdate={handleArrayUpdate}
            onArrayRemove={handleArrayRemove}
          />
        );

      case 6:
        return (
          <Step6ProceduresInsurance
            formData={formData}
            onArrayAdd={handleArrayAdd}
            onArrayUpdate={handleArrayUpdate}
            onArrayRemove={handleArrayRemove}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New Hospital</h1>
        <p className="text-muted-foreground">
          Complete all steps to add a new hospital to the system
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Step Navigation */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Steps</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {steps.map((step, index) => {
                    const isCompleted = completedSteps.includes(step.id);
                    const isCurrent = currentStep === step.id;
                    const isClickable =
                      isCompleted || isCurrent || step.id === currentStep + 1;

                    return (
                      <div key={step.id}>
                        <button
                          onClick={() => handleStepClick(step.id)}
                          disabled={!isClickable}
                          className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                            isCurrent
                              ? "bg-blue-50 border-r-2 border-blue-500"
                              : ""
                          } ${
                            !isClickable
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                isCompleted
                                  ? "bg-green-100 text-green-600"
                                  : isCurrent
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {isCompleted ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                step.id
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-medium ${
                                  isCurrent
                                    ? "text-blue-900"
                                    : isCompleted
                                    ? "text-green-900"
                                    : "text-gray-500"
                                }`}
                              >
                                {step.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </button>
                        {index < steps.length - 1 && (
                          <div className="border-b border-gray-100" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Step Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  {React.createElement(steps[currentStep - 1]?.icon, {
                    className: "w-4 h-4 text-blue-600",
                  })}
                </div>
                <span>{steps[currentStep - 1]?.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[400px]">{renderStepContent()}</div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep === steps.length ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="min-w-[120px]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      "Add Hospital"
                    )}
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
