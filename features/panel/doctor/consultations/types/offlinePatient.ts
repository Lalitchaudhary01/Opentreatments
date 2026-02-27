export type OfflinePatient = {
  id: string;
  doctorId: string;
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  phoneNumber?: string;
  complaint: string;
  prescription?: string;
  diagnosis?: string;
  followUpDate?: string;
  vitals?: {
    bloodPressure?: string;
    temperature?: number;
    weight?: number;
  };
  visitTime: string;
  createdAt: string;
};

export type AddOfflinePatientInput = {
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  phoneNumber?: string;
  complaint: string;
  prescription?: string;
  diagnosis?: string;
  followUpDate?: string;
  bloodPressure?: string;
  temperature?: number;
  weight?: number;
};