export interface Patient {
  id: string;
  userId: string;

  // Basic Personal Info
  fullName: string | null;
  age: number | null;
  gender: string | null;
  phoneNumber: string | null;
  email: string | null;
  address: string | null;

  // Physical Data
  height: string | null;
  weight: string | null;
  bloodGroup: string | null;

  // Medical History
  conditions: string[];
  allergies: string[];
  medications: Medication[];
  pastSurgeries: string[];
  familyHistory: string[];

  // Lifestyle
  smokingStatus: string | null;
  alcoholConsumption: string | null;
  dietType: string | null;
  sleepHours: number | null;
  activityLevel: string | null;
  waterIntake: number | null;
  stressLevel: string | null;

  // Checkup & Doctor Visit
  healthScore: number | null;
  lastVisit: Date | null;
  nextAppointment: Date | null;
  primaryDoctor: string | null;

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
  startDate?: Date | null;
  endDate?: Date | null;
}

export interface Appointment {
  id: string;
  patientId: string;
  date: Date;
  time: string;
  doctor: string;
  type: string;
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
