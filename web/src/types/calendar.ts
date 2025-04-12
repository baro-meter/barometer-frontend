import { BaroMeterScoreType } from "./barometerType";

export enum ReportViewType {
  MONTHLY = "monthly",
  WEEKLY = "weekly",
  LIST = "list",
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
