import { BaroMeterScoreType, BaroMeterType } from "./barometerType";
import { MissionPerType } from "./mission";

export enum ReportViewType {
  MONTHLY = "monthly",
  WEEKLY = "weekly",
}

export interface ReportType {
  archivedCount: number;
  archivedGoalIds: number[];
  date: string;
  message?: string;
  photo?: string;
  score: BaroMeterScoreType;
}

export interface CalendarViewType {
  reports: ReportType[];
}

// [new api]
export interface WeeklyCalendarViewType {
  dayOfWeekCount: number[];
  goalsPerTypes: MissionPerType[];
  report?: BaroMeterType;
}
