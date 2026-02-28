export type WeeklyHour = {
  day: string;
  enabled: boolean;
  open: string;
  close: string;
};

export type BreakSlot = {
  id: string;
  label: string;
  from: string;
  to: string;
};

export type HolidayBlock = {
  id: string;
  label: string;
  from: string;
  to: string;
  type: string;
};

export type SlotConfig = {
  duration: number;
  buffer: number;
  maxAppt: number;
  leadTime: string;
};
