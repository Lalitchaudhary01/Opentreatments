"use client";

import { Dispatch, SetStateAction } from "react";
import type { AuthMode } from "../doctor/DoctorOnboardingSteps";

export type PharmacyOnboardingFormState = {
  firstName: string;
  lastName: string;
  whatsAppNumber: string;
  profileRole: "Owner" | "Pharmacist" | "Manager";
  pinCode: string;
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
  const roleOptions: Array<PharmacyOnboardingFormState["profileRole"]> = [
    "Owner",
    "Pharmacist",
    "Manager",
  ];

  return (
    <>
      {mode === "pharmacy-details" && (
        <div className="ob-step active" id="ob-pharmacy-details">
          <div className="ob-step-title">Your details</div>
          <div className="ob-step-sub">
            Tell us about yourself so we can personalise your dashboard.
          </div>

          <div className="ob-row2">
            <div className="ob-ff">
              <label>First Name *</label>
              <input
                value={pharmacyForm.firstName}
                onChange={(e) =>
                  setPharmacyForm((p) => ({ ...p, firstName: e.target.value }))
                }
                placeholder="Rajesh"
              />
            </div>
            <div className="ob-ff">
              <label>Last Name *</label>
              <input
                value={pharmacyForm.lastName}
                onChange={(e) =>
                  setPharmacyForm((p) => ({ ...p, lastName: e.target.value }))
                }
                placeholder="Sharma"
              />
            </div>
          </div>

          <div className="ob-row2">
            <div className="ob-ff">
              <label>Phone number *</label>
              <input
                value={pharmacyForm.phone}
                onChange={(e) => setPharmacyForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="ob-ff">
              <label>WhatsApp number</label>
              <input
                value={pharmacyForm.whatsAppNumber}
                onChange={(e) =>
                  setPharmacyForm((p) => ({ ...p, whatsAppNumber: e.target.value }))
                }
                placeholder="Same as phone"
              />
            </div>
          </div>

          <div className="ob-ff" style={{ marginBottom: 8 }}>
            <label>Your role *</label>
          </div>
          <div className="role-grid">
            {roleOptions.map((role) => (
              <button
                key={role}
                type="button"
                className={`role-chip ${pharmacyForm.profileRole === role ? "sel" : ""}`}
                onClick={() => setPharmacyForm((p) => ({ ...p, profileRole: role }))}
              >
                <div className="role-chip-lbl">{role}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === "pharmacy-location" && (
        <div className="ob-step active" id="ob-pharmacy-location">
          <div className="ob-step-title">Pharmacy setup</div>
          <div className="ob-step-sub">
            A few details about your store. You can update everything from Settings later.
          </div>

          <div className="ob-ff">
            <label>Pharmacy / Store name *</label>
            <input
              value={pharmacyForm.name}
              onChange={(e) => setPharmacyForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Sharma Medical Hall"
            />
          </div>

          <div className="ob-row2">
            <div className="ob-ff">
              <label>City *</label>
              <input
                value={pharmacyForm.city}
                onChange={(e) => setPharmacyForm((p) => ({ ...p, city: e.target.value }))}
                placeholder="Mumbai"
              />
            </div>
            <div className="ob-ff">
              <label>PIN code</label>
              <input
                value={pharmacyForm.pinCode}
                onChange={(e) => setPharmacyForm((p) => ({ ...p, pinCode: e.target.value }))}
                placeholder="400001"
              />
            </div>
          </div>

          <div className="ob-row2">
            <div className="ob-ff">
              <label>Drug License No.</label>
              <input
                value={pharmacyForm.licenseNumber}
                onChange={(e) =>
                  setPharmacyForm((p) => ({ ...p, licenseNumber: e.target.value }))
                }
                placeholder="MH-MUM-123456"
              />
              <div className="ob-hint">State drug license (CA/CG/B20/B21)</div>
            </div>
            <div className="ob-ff">
              <label>GSTIN</label>
              <input
                value={pharmacyForm.gstNumber}
                onChange={(e) => setPharmacyForm((p) => ({ ...p, gstNumber: e.target.value }))}
                placeholder="27AAAAA0000A1Z5"
              />
              <div className="ob-hint">15-digit GST number</div>
            </div>
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
