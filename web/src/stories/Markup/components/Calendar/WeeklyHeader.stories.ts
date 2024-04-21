import type {Meta, StoryObj} from '@storybook/react';

import WeeklyHeader from 'markup/components/Calendar/WeeklyHeader';

const meta = {
  title: 'Markup/Components/Calendar/WeeklyHeader',
  component: WeeklyHeader,
  argTypes: {},
} satisfies Meta<typeof WeeklyHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    year: 2024,
    month: 4,
    week: 3
  },
};
