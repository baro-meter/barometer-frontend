import type { Meta, StoryObj } from "@storybook/react";
import Summary from "@/markup/components/SummaryView";

const meta = {
  title: "Markup/Components/Summary",
  component: Summary,
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<typeof Summary>;

export default meta;
type Story = StoryObj<typeof Summary>;

export const Default: Story = {
  args: { 
    text: "오늘 참다 못해 폭식해버렸다. 최근 식단도 잘하고 운동도 곧잘 갔는데 날씨가 좋아지니 참을 수 없었음. 솔직히 존맛이었다.",
    typeFull: false,
    missionTexts: ["모닝 스트레칭", "필라테스", "하루에 물2L 마시기", "여러개 되면 떨어짐", "일이삼사오육칠팔구십"],
    status: "excellent",
    statusText: "완벽했어요",
  },
};

export const Full: Story = {
  args: { 
    text: "아침마다 무거웠던 어깨가 한결 가벼워졌다. 필테 선생님이 추천해주신 스트레칭이 효과가 있었던듯ㅎㅎ",
    typeFull: true,
    missionTexts: ["누워있기", "넷플릭스 보기", "쉬기"],
    status: "good",
    statusText: "적당해요",
  },
};
