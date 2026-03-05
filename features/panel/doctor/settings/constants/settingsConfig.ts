export type SettingsTab = "notifications" | "security" | "payment" | "datetime";

export type ToggleItem = {
  label: string;
  desc: string;
  on: boolean;
};

export const SETTINGS_TABS: { id: SettingsTab; label: string }[] = [
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "payment", label: "Payment & Billing" },
  { id: "datetime", label: "Date & Time" },
];

export const INITIAL_NOTIFICATIONS = {
  appts: [
    { label: "New Booking", desc: "When a patient books an appointment", on: true },
    { label: "Cancellation", desc: "When a patient cancels", on: true },
    { label: "Appointment Reminder", desc: "1 hour before each appointment", on: false },
    { label: "Reschedule Request", desc: "When a patient requests rescheduling", on: true },
  ] as ToggleItem[],
  rev: [
    { label: "Payment Received", desc: "When a payment is confirmed", on: true },
    { label: "Weekly Summary", desc: "Revenue summary every Monday", on: true },
    { label: "Payout Processed", desc: "When earnings are transferred", on: true },
  ] as ToggleItem[],
  sys: [
    { label: "Product Updates", desc: "New features and improvements", on: false },
    { label: "Security Alerts", desc: "Login from new device or location", on: true },
    { label: "Review Received", desc: "When a patient leaves a review", on: true },
  ] as ToggleItem[],
  wa: [
    { label: "New Appointment Booked", desc: "Instant alert when a patient books", on: true },
    { label: "Appointment Cancellation", desc: "Alert when a patient cancels or no-shows", on: true },
    { label: "Payment Confirmed", desc: "When a payment clears successfully", on: true },
    { label: "Daily Summary (9 AM)", desc: "Overview of the day's schedule each morning", on: false },
    { label: "New Patient Review", desc: "When a patient posts a review on the app", on: false },
    { label: "Low Slot Alert", desc: "When fewer than 2 slots remain for the day", on: true },
  ] as ToggleItem[],
};
