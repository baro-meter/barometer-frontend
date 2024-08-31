import type { Meta, StoryObj } from "@storybook/react";
import CalendarHeaderView from "@/markup/components/calendar/CalendarHeaderView";

const meta = {
  title: "Markup/Components/Calendar/CalendarHeader",
  component: CalendarHeaderView,
  argTypes: {
    type: { control: "select", options: ["weekly", "monthly"] },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Monthly | Weekly 통합",
      },
    },
  },
} satisfies Meta<typeof CalendarHeaderView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Weekly: Story = {
  args: {
    type: "weekly",
    year: 2024,
    month: 4,
  },
};

export const Monthly: Story = {
  args: {
    type: "monthly",
    year: 2024,
    month: 4,
  },
};
