"use client";

import { Dispatch, SetStateAction } from "react";
import type { AuthMode } from "../doctor/DoctorOnboardingSteps";

export type LabOnboardingFormState = {
  ownerName: string;
  phone: string;
  registrationNumber: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  website: string;
};

type LabOnboardingStepsProps = {
  mode: AuthMode;
  labForm: LabOnboardingFormState;
  setLabForm: Dispatch<SetStateAction<LabOnboardingFormState>>;
  onSetupDashboard: () => void;
};

export function LabOnboardingSteps({
  mode,
  labForm,
  setLabForm,
  onSetupDashboard,
}: LabOnboardingStepsProps) {
  return (
    <>
      {mode === "lab-details" && (
        <div className="ob-step active" id="ob-lab-details">
          <div className="ob-step-title">Your lab details</div>
          <div className="ob-step-sub">Tell us about the person in charge and compliance details.</div>

          <div className="ob-row2">
            <div className="ob-ff">
              <label>Owner / Contact Person *</label>
              <input
                value={labForm.ownerName}
                onChange={(e) => setLabForm((p) => ({ ...p, ownerName: e.target.value }))}
                placeholder="Rohit Sharma"
              />
            </div>
            <div className="ob-ff">
              <label>Phone Number *</label>
              <input
                value={labForm.phone}
                onChange={(e) => setLabForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="ob-row2">
            <div className="ob-ff">
              <label>Registration Number *</label>
              <input
                value={labForm.registrationNumber}
                onChange={(e) => setLabForm((p) => ({ ...p, registrationNumber: e.target.value }))}
                placeholder="LAB-REG-2026-001"
              />
            </div>
            <div className="ob-ff">
              <label>Lab Name *</label>
              <input
                value={labForm.name}
                onChange={(e) => setLabForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Sunrise Diagnostics"
              />
            </div>
          </div>

          <div className="ob-ff">
            <label>Email *</label>
            <input
              type="email"
              value={labForm.email}
              onChange={(e) => setLabForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="lab@sunrise.com"
            />
          </div>
        </div>
      )}

      {mode === "lab-location" && (
        <div className="ob-step active" id="ob-lab-location">
          <div className="ob-step-title">Location & contact</div>
          <div className="ob-step-sub">Add address details. This will be sent for admin approval.</div>

          <div className="ob-ff">
            <label>Address *</label>
            <input
              value={labForm.address}
              onChange={(e) => setLabForm((p) => ({ ...p, address: e.target.value }))}
              placeholder="12 Health Street, Near Metro Gate 2"
            />
          </div>

          <div className="ob-row3">
            <div className="ob-ff">
              <label>City *</label>
              <input
                value={labForm.city}
                onChange={(e) => setLabForm((p) => ({ ...p, city: e.target.value }))}
                placeholder="Pune"
              />
            </div>
            <div className="ob-ff">
              <label>State *</label>
              <input
                value={labForm.state}
                onChange={(e) => setLabForm((p) => ({ ...p, state: e.target.value }))}
                placeholder="Maharashtra"
              />
            </div>
            <div className="ob-ff">
              <label>PIN Code</label>
              <input
                value={labForm.pincode}
                onChange={(e) => setLabForm((p) => ({ ...p, pincode: e.target.value }))}
                placeholder="411001"
              />
            </div>
          </div>

          <div className="ob-row2">
            <div className="ob-ff">
              <label>Country *</label>
              <input
                value={labForm.country}
                onChange={(e) => setLabForm((p) => ({ ...p, country: e.target.value }))}
                placeholder="India"
              />
            </div>
            <div className="ob-ff">
              <label>Website (optional)</label>
              <input
                value={labForm.website}
                onChange={(e) => setLabForm((p) => ({ ...p, website: e.target.value }))}
                placeholder="https://sunrisediagnostics.com"
              />
            </div>
          </div>
        </div>
      )}

      {mode === "lab-success" && (
        <div className="ob-step active" id="ob-lab-success">
          <div className="ob-step-title">You&apos;re all set, Lab!</div>
          <div className="ob-step-sub">
            Your profile has been submitted and is under admin review.
          </div>
          <button className="ob-btn ob-btn-launch" type="button" onClick={onSetupDashboard}>
            Setup Dashboard
          </button>
        </div>
      )}
    </>
  );
}
