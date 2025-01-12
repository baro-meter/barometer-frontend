export interface ReportType {
  archivedCount: number;
  archivedGoalIds: number[];
  date: string;
  message?: string;
  photo?: string;
  score: number;
}

export interface CalendarViewType {
  reports: ReportType[];
}
