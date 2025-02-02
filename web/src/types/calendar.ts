import { BaroMeterScoreType } from "./barometerType";

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
