export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  href: string;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: 'Basic Information',
    description: 'Hospital name, address, contact details',
    href: '/hospital/onboarding?step=1',
  },
  {
    id: 2,
    title: 'Departments & Doctors',
    description: 'Add departments and doctors',
    href: '/hospital/onboarding?step=2',
  },
  {
    id: 3,
    title: 'Facilities & Services',
    description: 'Tell us about your facilities and services',
    href: '/hospital/onboarding?step=3',
  },
  {
    id: 4,
    title: 'Verification',
    description: 'Submit for verification',
    href: '/hospital/onboarding?step=4',
  },
];

export const getStepByNumber = (stepNumber: number): OnboardingStep | undefined => {
  return onboardingSteps.find(step => step.id === stepNumber);
};

export const isStepCompleted = (currentStep: number, stepId: number): boolean => {
  return currentStep > stepId;
};

export const isStepActive = (currentStep: number, stepId: number): boolean => {
  return currentStep === stepId;
};