interface GoalType {
  monthlyGoalId: number;
  title: string;
  typeId: number;
  count: number;
  archivedDates: string[];
}

interface ReportType {
  date: string;
  score: number;
}

export interface CalendarViewType {
  goals: GoalType[];
  reports: ReportType[];
}
