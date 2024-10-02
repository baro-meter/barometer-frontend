import type { Meta, StoryObj } from "@storybook/react";
import Badge from "@/markup/components/BadgeView";

const meta = {
  title: "Markup/Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ["excellent", "good", "insufficient", "poor"],
      },
    },
    statusText: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    status: "excellent",
    statusText: "완벽했어요",
  },
};

export const GoodStatus: Story = {
  args: {
    status: "good",
    statusText: "적당해요",
  },
};

export const InsufficientStatus: Story = {
  args: {
    status: "insufficient",
    statusText: "노력했어요",
  },
};

export const PoorStatus: Story = {
  args: {
    status: "poor",
    statusText: "못했어요",
  },
};
