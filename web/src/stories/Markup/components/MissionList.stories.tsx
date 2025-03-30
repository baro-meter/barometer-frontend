import MissionListView from "@/markup/components/MissionListView";
import { SubMissionItem } from "@/types/mission";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Markup/Components/MissionList",
  component: MissionListView,
  tags: ["autodocs"],
} satisfies Meta<typeof MissionListView>;

export default meta;
type Story = StoryObj<typeof meta>;

// 예시 서브미션 데이터
const sampleSubMissions: Record<string, SubMissionItem[]> = {
  routine: [
    { title: "아침 7시 기상하기", date: 2 },
    { title: "물 하루 2L 마시기", date: 3 },
  ],
  weight: [
    { title: "30분 유산소 운동", date: 1 },
    { title: "단백질 위주 식단 유지", date: 4 },
  ],
  calm: [
    { title: "하루 10분 명상하기", date: 2 },
    { title: "취침 전 휴대폰 끄기", date: 5 },
  ],
  growth: [
    { title: "하루 30분 독서하기", date: 3 },
    { title: "새로운 기술 배우기", date: 4 },
  ],
};

// 미션만 보여주는 스토리 (기본)
export const MissionOnly: Story = {
  render: () => <MissionListView viewType="missionOnly" />,
};

// 미션과 서브미션 모두 보여주는 스토리
export const MissionWithSubMission: Story = {
  render: () => (
    <MissionListView viewType="both" subMissions={sampleSubMissions} />
  ),
};

// 서브미션만 보여주는 스토리
export const SubMissionOnly: Story = {
  render: () => (
    <MissionListView
      viewType="subMissionOnly"
      subMissions={sampleSubMissions}
    />
  ),
};
