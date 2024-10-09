export enum GoalTypeId {
  OTHER = 0,
  REGULAR_LIFE,
  PEACE_OF_MIND,
  WEIGHT_MANAGEMENT,
}

export interface GoalType {
  id: number;
  title: string;
  typeId: number;
  count: GoalTypeId; // 주별 목표 달성 횟수
  archived: string[]; // ["2024-12-30", "2024-12-31"];
}

export interface GoalStateType {
  // key: YYYY-MM (ex. 2024-10)
  [key: string]: GoalType[];
}
