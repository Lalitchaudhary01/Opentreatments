export interface Patient {
  id: string;
  userId: string;

  // Basic Personal Info
  fullName?: string;
  age?: number;
  gender?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;

  // Physical Data
  height?: string;
  weight?: string;
  bloodGroup?: string;

  // Medical History
  conditions: string[];
  allergies: string[];
  medications: Medication[];
  pastSurgeries: string[];
  familyHistory: string[];

  // Lifestyle
  smokingStatus?: "smoker" | "non-smoker" | "past-smoker";
  alcoholConsumption?: "none" | "occasional" | "regular";
  dietType?: "veg" | "non-veg" | "vegan";
  sleepHours?: number;
  activityLevel?: "low" | "moderate" | "high";
  waterIntake?: number;
  stressLevel?: "low" | "moderate" | "high";

  // Checkup & Doctor Visit
  healthScore?: number;
  lastVisit?: Date;
  nextAppointment?: Date;
  primaryDoctor?: string;

  // System Fields
  createdAt: Date;
  updatedAt: Date;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  forCondition: string;
  startDate?: Date;
  endDate?: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  date: Date;
  time: string;
  doctor: string;
  type: string;
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
