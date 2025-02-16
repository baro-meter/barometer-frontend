import Divider from "@/markup/components/Divider";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Markup/Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    spacing: {
      control: { type: "select", options: [20, 30, 40] },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    spacing: 20,
  },
};

export const Spacing30: Story = {
  args: {
    spacing: 30,
  },
};

export const Spacing40: Story = {
  args: {
    spacing: 40,
  },
};
