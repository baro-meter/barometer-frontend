import { BaroMeterScoreType, BaroMeterType } from "./barometerType";
import { ArchivedMissionType, MissionPerType } from "./mission";

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

export interface MonthlyCalendarViewType {
  year: number;
  week: number;
  archivedMissions: ArchivedMissionType[];
}

type succesGoalCountType = 0 | 1 | 2 | 3 | 4 | 5;
export interface WeekDateViewItem {
  date: number;
  archivedCount?: succesGoalCountType; // 없으면 그냥 날짜 표시
}
