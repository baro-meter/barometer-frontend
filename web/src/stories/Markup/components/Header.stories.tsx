import type { Meta, StoryObj } from "@storybook/react";
import HeaderView from "@/markup/components/HeaderView";

const meta = {
  title: "Markup/Components/Header",
  component: HeaderView,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof HeaderView>;

export default meta;
type Story = StoryObj<typeof HeaderView>;

export const Basic: Story = {
  args: {
    headerType: 'basic',
    titleText: '이번 주 미션'
  },
};

export const Back: Story = {
  args: {
    headerType: 'back',
    titleText: '기록 모아보기'
  },
};

export const OnlyBack: Story = {
  args: {
    headerType: 'onlyBack'
  },
};

export const Progress: Story = {
  args: {
    headerType: 'progress',
    progressWidth: 20
  },
};

export const TitleWithOption: Story = {
  args: {
    headerType: 'titleWithOption',
    titleText: '15.TODAY'
  },
};