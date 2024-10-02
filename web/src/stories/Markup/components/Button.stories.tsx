import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/markup/components/ButtonView";

const meta = {
  title: "Markup/Components/Button",
  component: Button,
  argTypes: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    label: '오늘의 바로미터 작성',
    disabled: true
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: '오늘의 바로미터 작성',
    disabled: false
  },
};

