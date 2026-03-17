"use client";

import { Dispatch, SetStateAction } from "react";
import type { AuthMode } from "../doctor/DoctorOnboardingSteps";

export type HospitalOnboardingFormState = {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  website: string;
};

type HospitalOnboardingStepsProps = {
  mode: AuthMode;
  hospitalForm: HospitalOnboardingFormState;
  setHospitalForm: Dispatch<SetStateAction<HospitalOnboardingFormState>>;
  onSetupDashboard: () => void;
};

export function HospitalOnboardingSteps({
  mode,
  hospitalForm,
  setHospitalForm,
  onSetupDashboard,
}: HospitalOnboardingStepsProps) {
  return (
    <>
      {mode === "hospital-details" && (
        <div className="ob-step active" id="ob-hospital-details">
          <div className="ob-step-title">Hospital details</div>
          <div className="ob-step-sub">
            Tell us about your hospital so we can set up your admin panel.
          </div>

          <div className="ob-ff">
            <label>Hospital name *</label>
            <input
              value={hospitalForm.name}
              onChange={(e) => setHospitalForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Sunrise Multispeciality Hospital"
            />
          </div>

          <div className="ob-row2">
            <div className="ob-ff">
              <label>Contact person *</label>
              <input
                value={hospitalForm.contactPerson}
                onChange={(e) =>
                  setHospitalForm((p) => ({ ...p, contactPerson: e.target.value }))
                }
                placeholder="Admin / Owner name"
              />
            </div>
            <div className="ob-ff">
              <label>Phone *</label>
              <input
                value={hospitalForm.phone}
                onChange={(e) => setHospitalForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="ob-ff">
            <label>Email *</label>
            <input
              type="email"
              value={hospitalForm.email}
              onChange={(e) => setHospitalForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="hospital@domain.com"
            />
          </div>
        </div>
      )}

      {mode === "hospital-location" && (
        <div className="ob-step active" id="ob-hospital-location">
          <div className="ob-step-title">Location &amp; contact</div>
          <div className="ob-step-sub">
            Add your hospital address. You can update all profile details later.
          </div>

          <div className="ob-ff">
            <label>Address *</label>
            <input
              value={hospitalForm.address}
              onChange={(e) => setHospitalForm((p) => ({ ...p, address: e.target.value }))}
              placeholder="Street, area, landmark"
            />
          </div>

          <div className="ob-row3">
            <div className="ob-ff">
              <label>City *</label>
              <input
                value={hospitalForm.city}
                onChange={(e) => setHospitalForm((p) => ({ ...p, city: e.target.value }))}
                placeholder="Pune"
              />
            </div>
            <div className="ob-ff">
              <label>State *</label>
              <input
                value={hospitalForm.state}
                onChange={(e) => setHospitalForm((p) => ({ ...p, state: e.target.value }))}
                placeholder="Maharashtra"
              />
            </div>
            <div className="ob-ff">
              <label>Country *</label>
              <input
                value={hospitalForm.country}
                onChange={(e) => setHospitalForm((p) => ({ ...p, country: e.target.value }))}
                placeholder="India"
              />
            </div>
          </div>

          <div className="ob-ff">
            <label>Website (optional)</label>
            <input
              value={hospitalForm.website}
              onChange={(e) => setHospitalForm((p) => ({ ...p, website: e.target.value }))}
              placeholder="https://yourhospital.com"
            />
          </div>
        </div>
      )}

      {mode === "hospital-success" && (
        <div className="ob-step active" id="ob-hospital-success">
          <div className="ob-step-title">You're all set, Hospital!</div>
          <div className="ob-step-sub">
            Your profile has been submitted and is currently under admin review.
          </div>
          <button className="ob-btn ob-btn-launch" type="button" onClick={onSetupDashboard}>
            Setup Dashboard
          </button>
        </div>
      )}
    </>
  );
}
