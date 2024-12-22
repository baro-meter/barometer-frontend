import type { Meta, StoryObj } from "@storybook/react";
import SubTab from "@/markup/components/SubTab";

const meta = {
  title: "Markup/Components/SubTab",
  component: SubTab,
} satisfies Meta<typeof SubTab>;

export default meta;
type Story = StoryObj<typeof SubTab>;

export const Basic: Story = {
  args: {
    title: "15.TODAY",
    hasBorder: true,
  },
};
