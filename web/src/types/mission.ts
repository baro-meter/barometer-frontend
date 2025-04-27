export enum MissionCategoryId {
  OTHER = 0,
  REGULAR_LIFE,
  PEACE_OF_MIND,
  WEIGHT_MANAGEMENT,
  CONDITION_IMPROVEMENT,
  BASIC_STRENGTH,
}

export interface MissionCategoryInfo {
  icon: string; // 미션 아이콘
  title: string;
  description: string;
}

export const MISSION_INFO: Record<MissionCategoryId, MissionCategoryInfo> = {
  [MissionCategoryId.OTHER]: {
    icon: "",
    title: "기타",
    description: "다른 카테고리에 속하지 않는 미션들입니다.",
  },
  [MissionCategoryId.REGULAR_LIFE]: {
    icon: "routine",
    title: "규칙적인 생활",
    description: "일상의 규칙을 만들어 건강하게 생활해요.",
  },
  [MissionCategoryId.PEACE_OF_MIND]: {
    icon: "calm",
    title: "마음의 여유",
    description: "평온한 하루를 위해 나에게 시간을 주세요.",
  },
  [MissionCategoryId.WEIGHT_MANAGEMENT]: {
    icon: "weight",
    title: "체중 관리",
    description: "식습관과 운동 관리로 가벼운 몸을 유지해요.",
  },
  [MissionCategoryId.CONDITION_IMPROVEMENT]: {
    icon: "condition",
    title: "컨디션 개선",
    description: "건강한 몸과 마음을 위한 습관을 만들어요.",
  },
  [MissionCategoryId.BASIC_STRENGTH]: {
    icon: "growth",
    title: "기초 체력",
    description: "기본적인 체력을 키워 건강한 생활을 유지해요.",
  },
} as const;

// MissionCategoryId를 key로, MissionCategoryInfo를 value로 가지는 타입
export type MissionMap = {
  [key in MissionCategoryId]: MissionCategoryInfo;
};

// = api mission type
export const MISSION_CATEGORIES = Object.values(MISSION_INFO).map(
  (info) => info.icon
);
export type MissionCategoryType = (typeof MISSION_CATEGORIES)[number];

export interface MissionItem {
  title: string;
  description?: string;
  iconType?: boolean;
}

export interface SubMissionItem {
  title: string;
  date: number;
}

export interface MissionType {
  id: number;
  name: string;
  count: number; // 미션 달성 목표 개수
  archivedDaysOfWeek: number[]; // 실제 미션 달성 날짜 배열
}

export interface MissionPerType {
  type: MissionCategoryId;
  goals: MissionType[];
}
