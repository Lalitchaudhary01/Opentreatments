"use client";

import { Dispatch, SetStateAction } from "react";

export type AuthMode =
  | "register"
  | "verify"
  | "doctor-details"
  | "doctor-clinic"
  | "doctor-success"
  | "pharmacy-details"
  | "pharmacy-location"
  | "pharmacy-success"
  | "login";

export type DoctorOnboardingFormState = {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  medicalRegistrationNumber: string;
  qualification: string;
  graduationYear: string;
  experienceLabel: string;
  languages: string;
  clinicName: string;
  city: string;
  pinCode: string;
  address: string;
  specialization: string;
};

const QUALIFICATIONS = [
  "MBBS",
  "MBBS, MD",
  "MBBS, MS",
  "MBBS, DNB",
  "BDS",
  "BDS, MDS",
  "BAMS",
  "BHMS",
  "BUMS",
  "PhD (Medical)",
  "Other",
];

const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10–15 years",
  "15–20 years",
  "20+ years",
];

const SPECIALIZATION_OPTIONS = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Orthopaedic",
  "Paediatrician",
  "Gynaecologist",
  "ENT Specialist",
  "Neurologist",
  "Other",
];

type DoctorOnboardingStepsProps = {
  mode: AuthMode;
  doctorForm: DoctorOnboardingFormState;
  setDoctorForm: Dispatch<SetStateAction<DoctorOnboardingFormState>>;
  onSetupDashboard: () => void;
};

export function DoctorOnboardingSteps({
  mode,
  doctorForm,
  setDoctorForm,
  onSetupDashboard,
}: DoctorOnboardingStepsProps) {
  return (
    <>
      {mode === "doctor-details" && (
        <div className="ob-step active" id="ob-s2">
          <div className="ob-step-title">Your professional details</div>
          <div className="ob-step-sub">Tell us about your medical background so patients can trust you.</div>
          <div className="ob-row2">
            <div className="ob-ff"><label>First Name *</label><input value={doctorForm.firstName} onChange={(e) => setDoctorForm((p) => ({ ...p, firstName: e.target.value }))} placeholder="Ramesh" /></div>
            <div className="ob-ff"><label>Last Name *</label><input value={doctorForm.lastName} onChange={(e) => setDoctorForm((p) => ({ ...p, lastName: e.target.value }))} placeholder="Iyer" /></div>
          </div>
          <div className="ob-row2">
            <div className="ob-ff"><label>Phone Number *</label><input value={doctorForm.phone} onChange={(e) => setDoctorForm((p) => ({ ...p, phone: e.target.value }))} placeholder="+91 98765 43210" /></div>
            <div className="ob-ff">
              <label>Gender</label>
              <select value={doctorForm.gender} onChange={(e) => setDoctorForm((p) => ({ ...p, gender: e.target.value }))}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="ob-row2">
            <div className="ob-ff"><label>Medical Registration Number *</label><input value={doctorForm.medicalRegistrationNumber} onChange={(e) => setDoctorForm((p) => ({ ...p, medicalRegistrationNumber: e.target.value }))} placeholder="e.g. MH-2010-44122 (State Medical Council)" /></div>
            <div className="ob-ff">
              <label>Highest Qualification *</label>
              <select value={doctorForm.qualification} onChange={(e) => setDoctorForm((p) => ({ ...p, qualification: e.target.value }))}>
                {QUALIFICATIONS.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="ob-row2">
            <div className="ob-ff"><label>Year of Graduation</label><input type="number" min={1960} max={2026} value={doctorForm.graduationYear} onChange={(e) => setDoctorForm((p) => ({ ...p, graduationYear: e.target.value }))} placeholder="2010" /></div>
            <div className="ob-ff">
              <label>Years of Experience</label>
              <select value={doctorForm.experienceLabel} onChange={(e) => setDoctorForm((p) => ({ ...p, experienceLabel: e.target.value }))}>
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="ob-ff"><label>Languages spoken to patients</label><input value={doctorForm.languages} onChange={(e) => setDoctorForm((p) => ({ ...p, languages: e.target.value }))} placeholder="English, Hindi, Marathi…" /></div>
        </div>
      )}

      {mode === "doctor-clinic" && (
        <div className="ob-step active" id="ob-s3">
          <div className="ob-step-title">Clinic &amp; specialisation</div>
          <div className="ob-step-sub">Where do you practise? What do you specialise in?</div>
          <div className="ob-ff"><label>Clinic / Hospital Name *</label><input value={doctorForm.clinicName} onChange={(e) => setDoctorForm((p) => ({ ...p, clinicName: e.target.value }))} placeholder="Sunrise Clinic" /></div>
          <div className="ob-row2">
            <div className="ob-ff"><label>City *</label><input value={doctorForm.city} onChange={(e) => setDoctorForm((p) => ({ ...p, city: e.target.value }))} placeholder="Pune" /></div>
            <div className="ob-ff"><label>Pin Code</label><input value={doctorForm.pinCode} onChange={(e) => setDoctorForm((p) => ({ ...p, pinCode: e.target.value }))} placeholder="411001" /></div>
          </div>
          <div className="ob-ff"><label>Full Address</label><input value={doctorForm.address} onChange={(e) => setDoctorForm((p) => ({ ...p, address: e.target.value }))} placeholder="Shop 4, Koregaon Park Plaza, Pune" /></div>
          <div className="ob-ff" style={{ marginBottom: 8 }}><label>Primary Specialisation *</label></div>
          <div className="spec-grid">
            {SPECIALIZATION_OPTIONS.map((spec) => (
              <div key={spec} className={`sc-chip ${doctorForm.specialization === spec ? "sel" : ""}`} onClick={() => setDoctorForm((p) => ({ ...p, specialization: spec }))}>
                <div className="sc-chip-lbl">{spec}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === "doctor-success" && (
        <div className="ob-step active" id="ob-success">
          <div className="ob-step-title">You're all set, Doctor!</div>
          <div className="ob-step-sub">Your profile is submitted and under admin review. This usually takes a short time.</div>
          <button className="ob-btn ob-btn-launch" type="button" onClick={onSetupDashboard}>
            Setup Dashboard
          </button>
        </div>
      )}
    </>
  );
}
