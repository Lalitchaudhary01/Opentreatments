"use client";

import { Dispatch, SetStateAction } from "react";
import type { AuthMode } from "../doctor/DoctorOnboardingSteps";

export type PharmacyOnboardingFormState = {
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  licenseNumber: string;
  gstNumber: string;
};

type PharmacyOnboardingStepsProps = {
  mode: AuthMode;
  pharmacyForm: PharmacyOnboardingFormState;
  setPharmacyForm: Dispatch<SetStateAction<PharmacyOnboardingFormState>>;
  onSetupDashboard: () => void;
};

export function PharmacyOnboardingSteps({
  mode,
  pharmacyForm,
  setPharmacyForm,
  onSetupDashboard,
}: PharmacyOnboardingStepsProps) {
  return (
    <>
      {mode === "pharmacy-details" && (
        <div className="ob-step active" id="ob-pharmacy-details">
          <div className="ob-step-title">Pharmacy personal details</div>
          <div className="ob-step-sub">
            Add core owner and license details to start your pharmacy verification.
          </div>

          <div className="ob-ff">
            <label>Pharmacy Name *</label>
            <input
              value={pharmacyForm.name}
              onChange={(e) => setPharmacyForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="HealthCare Plus Pharmacy"
            />
          </div>

          <div className="ob-row2">
            <div className="ob-ff">
              <label>Owner Name *</label>
              <input
                value={pharmacyForm.ownerName}
                onChange={(e) =>
                  setPharmacyForm((p) => ({ ...p, ownerName: e.target.value }))
                }
                placeholder="Ravi Kumar"
              />
            </div>
            <div className="ob-ff">
              <label>Phone *</label>
              <input
                value={pharmacyForm.phone}
                onChange={(e) => setPharmacyForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="9876543210"
              />
            </div>
          </div>

          <div className="ob-row2">
            <div className="ob-ff">
              <label>Email *</label>
              <input
                type="email"
                value={pharmacyForm.email}
                onChange={(e) => setPharmacyForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="pharmacy@example.com"
              />
            </div>
            <div className="ob-ff">
              <label>License Number *</label>
              <input
                value={pharmacyForm.licenseNumber}
                onChange={(e) =>
                  setPharmacyForm((p) => ({ ...p, licenseNumber: e.target.value }))
                }
                placeholder="DL-20B-12345"
              />
            </div>
          </div>

        </div>
      )}

      {mode === "pharmacy-location" && (
        <div className="ob-step active" id="ob-pharmacy-location">
          <div className="ob-step-title">Pharmacy address & business info</div>
          <div className="ob-step-sub">
            Add your shop location and tax details before final submission.
          </div>

          <div className="ob-ff">
            <label>Address *</label>
            <input
              value={pharmacyForm.address}
              onChange={(e) => setPharmacyForm((p) => ({ ...p, address: e.target.value }))}
              placeholder="Shop no. 10, Main market"
            />
          </div>

          <div className="ob-row3">
            <div className="ob-ff">
              <label>City *</label>
              <input
                value={pharmacyForm.city}
                onChange={(e) => setPharmacyForm((p) => ({ ...p, city: e.target.value }))}
                placeholder="Pune"
              />
            </div>
            <div className="ob-ff">
              <label>State *</label>
              <input
                value={pharmacyForm.state}
                onChange={(e) => setPharmacyForm((p) => ({ ...p, state: e.target.value }))}
                placeholder="Maharashtra"
              />
            </div>
            <div className="ob-ff">
              <label>Country *</label>
              <input
                value={pharmacyForm.country}
                onChange={(e) => setPharmacyForm((p) => ({ ...p, country: e.target.value }))}
                placeholder="India"
              />
            </div>
          </div>

          <div className="ob-ff">
            <label>GST Number (optional)</label>
            <input
              value={pharmacyForm.gstNumber}
              onChange={(e) => setPharmacyForm((p) => ({ ...p, gstNumber: e.target.value }))}
              placeholder="27ABCDE1234F1Z5"
            />
          </div>
        </div>
      )}

      {mode === "pharmacy-success" && (
        <div className="ob-step active" id="ob-pharmacy-success">
          <div className="ob-step-title">You're all set, Pharmacy!</div>
          <div className="ob-step-sub">
            Your pharmacy profile is submitted and under admin review.
          </div>
          <button className="ob-btn ob-btn-launch" type="button" onClick={onSetupDashboard}>
            Setup Dashboard
          </button>
        </div>
      )}
    </>
  );
}
