/**
 * 삭제 예정
 */
export enum GoalTypeId {
  OTHER = 0,
  REGULAR_LIFE,
  PEACE_OF_MIND,
  WEIGHT_MANAGEMENT,
  CONDITION_IMPROVEMENT,
  BASIC_STRENGTH,
}

export interface GoalType {
  monthlyGoalId: number;
  title: string;
  typeId: number;
  count: GoalTypeId; // 주별 목표 달성 횟수
  archivedDates: string[]; // ["2024-12-30", "2024-12-31"];
}

export interface GoalStateType {
  // key: YYYY-MM (ex. 2024-10)
  [key: string]: GoalType[];
}

export interface GoalCategoryType {
  typeId?: GoalTypeId; // 전체는 goalTypeId가 없다.
  text: string;
  order: number;
}
