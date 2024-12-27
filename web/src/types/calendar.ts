interface GoalType {
  monthlyGoalId: number;
  title: string;
  typeId: number;
  count: number;
  archivedDates: string[];
}

export interface ReportType {
  archivedCount: number;
  archivedGoalIds: number[];
  date: string;
  message?: string;
  photo?: string;
  score: number;
}

export interface CalendarViewType {
  goals: GoalType[]; // 이건 없는듯?
  reports: ReportType[];
}
