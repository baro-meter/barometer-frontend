import Test from "@/markup/pages/Test";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Markup/Pages/Test",
  component: Test,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof Test>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
