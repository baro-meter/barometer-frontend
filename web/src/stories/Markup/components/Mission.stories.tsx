import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import MissionLabel, { MissionItem, MissionLabelProps } from "@/markup/components/MissionLabelView";

const meta = {
  title: "Markup/Components/MissionLabel",
  component: MissionLabel,
  tags: ["autodocs"],
} satisfies Meta<typeof MissionLabel>;

export default meta;
type Story = StoryObj<typeof MissionLabel>;

const missions: MissionItem[] = [
  { title: "규칙적인 생활", description: "일상의 규칙을 만들어 건강하게 생활해요.", iconType: true },
  { title: "체중 관리", description: "건강한 식습관과 운동으로 가벼운 몸을 유지해요.", iconType: true },
  { title: "마음의 여유", description: "평온한 하루를 위해 나에게 시간을 주세요.", iconType: true },
  { title: "자기 개발", description: "지적 호기심을 높여 지식과 역량을 높여요.", iconType: true },
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
      { title: "일정한 수면 시간", description: "수면 패턴으로 체내 리듬을 규칙적으로 유지합니다.", iconType: false },
      { title: "일과 후 산책", description: "지친 업무에서 벗어나 사색하며 스트레스를 관리합니다.", iconType: false },
      { title: "충분한 한 끼 식사", description: "식사 시간을 일정하게 함으로써 소화기능을 향상시킵니다.", iconType: false },
      { title: "매일 밤 독서", description: "시간이나 독서량을 정해 집중력과 사고력을 높여보세요.", iconType: false },
      { title: "직접입력", description: "생각해 둔 미션이 있다면 직접 입력해주세요.", iconType: false },
    ],
  },
};
