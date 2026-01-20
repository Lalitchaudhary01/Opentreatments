"use client";

import {
  PharmacyProfileForm,
  StepBasicInfo,
  StepLicense,
  StepInventory,
  StepAvailability,
  StepVerification,
} from "@/features/panel/pharmacies/screens/onboarding";
import { useState } from "react";
import { PharmacyProfileInput } from "@/features/panel/pharmacies/types";

export default function PharmacyOnboardingPage() {
  const [data, setData] = useState<Partial<PharmacyProfileInput>>({});
  const [items, setItems] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const steps = [
    <StepBasicInfo key="b" value={data} onChange={setData} />,
    <StepLicense key="l" value={data} onChange={setData} />,
    <StepInventory key="i" items={items} onChange={setItems} />,
    <StepAvailability key="a" isOpen={isOpen} onChange={setIsOpen} />,
    <StepVerification key="v" data={data} />,
  ];

  return <PharmacyProfileForm steps={steps} />;
}
