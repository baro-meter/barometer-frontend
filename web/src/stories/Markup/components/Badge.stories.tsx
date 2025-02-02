import type { Meta, StoryObj } from "@storybook/react";
import Badge from "@/markup/components/BadgeView";

const meta = {
  title: "Markup/Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    score: {
      control: {
        type: 1 | 2 | 3 | 4,
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    score: 4,
  },
};

export const GoodStatus: Story = {
  args: {
    score: 3,
  },
};

export const InsufficientStatus: Story = {
  args: {
    score: 2,
  },
};

export const PoorStatus: Story = {
  args: {
    score: 1,
  },
};
