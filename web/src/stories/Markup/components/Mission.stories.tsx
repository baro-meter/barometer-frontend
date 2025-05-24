import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import MissionLabel, {
  MissionLabelProps,
} from "@/markup/components/MissionLabelView";
import { MISSION_CATEGORIES, MISSION_INFO, MissionItem } from "@/types/mission";

const meta = {
  title: "Markup/Components/MissionLabel",
  component: MissionLabel,
  tags: ["autodocs"],
} satisfies Meta<typeof MissionLabel>;

export default meta;
type Story = StoryObj<typeof MissionLabel>;

// MISSION_INFO를 활용하여 missions 배열 생성
const missions: MissionItem[] = [
  ...MISSION_CATEGORIES.map((type) => ({
    title: MISSION_INFO[type].title,
    description: MISSION_INFO[type].description,
    iconType: true,
  })),
  // 직접입력 옵션 추가
  { title: "직접입력", description: "", iconType: false },
];

const MissionStory = (args: MissionLabelProps) => {
  const [checkedIndex, setCheckedIndex] = useState<number | null>(null);

  const handleChange = (index: number) => {
    setCheckedIndex(index);
  };

  return (
    <MissionLabel
      {...args}
      missions={args.missions || []}
      checkedIndex={checkedIndex ?? 0}
      onChange={handleChange}
    />
  );
};

export const MissionWithIcon: Story = {
  render: MissionStory,
  args: {
    missions: missions,
    alignType: true,
  },
};

export const Mission: Story = {
  render: MissionStory,
  args: {
    missions: [
      {
        title: "일정한 수면 시간",
        description: "수면 패턴으로 체내 리듬을 규칙적으로 유지합니다.",
        iconType: false,
      },
      {
        title: "일과 후 산책",
        description: "지친 업무에서 벗어나 사색하며 스트레스를 관리합니다.",
        iconType: false,
      },
      {
        title: "충분한 한 끼 식사",
        description: "식사 시간을 일정하게 함으로써 소화기능을 향상시킵니다.",
        iconType: false,
      },
      {
        title: "매일 밤 독서",
        description: "시간이나 독서량을 정해 집중력과 사고력을 높여보세요.",
        iconType: false,
      },
      {
        title: "직접입력",
        description: "생각해 둔 미션이 있다면 직접 입력해주세요.",
        iconType: false,
      },
    ],
  },
};
