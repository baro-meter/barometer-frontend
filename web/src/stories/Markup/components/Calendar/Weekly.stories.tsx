import type { Meta, StoryObj } from '@storybook/react';
import WeeklyView from 'markup/components/Calendar/WeeklyView';

const meta = {
  title: 'Markup/Components/Calendar/Weekly/Weekly',
  component: WeeklyView,
} satisfies Meta<typeof WeeklyView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    weekIdx: 3,
    weekDates: [14, 15, 16, 17, 18, 19, 20],
    activeDate: 14,
  },
};
