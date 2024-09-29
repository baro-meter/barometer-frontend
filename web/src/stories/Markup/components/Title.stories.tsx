import type { Meta, StoryObj } from "@storybook/react";
import Title from "@/markup/components/TitleView";

const meta = {
  title: "Markup/Components/Title",
  component: Title,
  argTypes: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof Title>;

export const Full: Story = {
  args: {
    titleType: 'full',
    title: (
      <>
        어떤 목적으로 <br />미션을 만드시나요?
      </>
    ),
    description: '적당한 미션을 만들 수 있도록 도와드릴게요.'
  },
};

export const Basic: Story = {
  args: {
    titleType: 'basic',
    title: '오늘 하루는 어땠나요?',
    description: '생각한 하루와 다르다면 직접 수정해주세요'
  },
};

export const Sub: Story = {
  args: {
    titleType: 'sub',
    title: '완료한 미션이 더 있나요?',
  },
};

export const Setting: Story = {
  args: {
    titleType: 'setting',
    title: '아직 미션을 설정하지 않았네요!',
    description: (
      <>
        간단한 것이라도 좋아요. <br />
        꾸준히 이뤄나가는 것이 중요하니까요.
      </>
    )
  },
};

