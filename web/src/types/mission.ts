export const MISSION_INFO = {
  routine: {
    title: "규칙적인 생활",
    description: "일상의 규칙을 만들어 건강하게 생활해요.",
  },
  weight: {
    title: "체중 관리",
    description: "식습관과 운동 관리로 가벼운 몸을 유지해요.",
  },
  calm: {
    title: "마음의 여유",
    description: "평온한 하루를 위해 나에게 시간을 주세요.",
  },
  growth: {
    title: "자기 개발",
    description: "지적 호기심을 높여 지식과 역량을 높여요.",
  },
} as const;

export const MISSION_TYPES = Object.keys(MISSION_INFO) as Array<
  keyof typeof MISSION_INFO
>;
export type MissionType = keyof typeof MISSION_INFO;

export interface MissionItem {
  title: string;
  description?: string;
  iconType?: boolean;
}

export interface SubMissionItem {
  title: string;
  date: number;
}
