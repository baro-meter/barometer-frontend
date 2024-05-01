import type {Meta, StoryObj} from '@storybook/react';

import MonthlyHeader from 'markup/components/Calendar/MonthlyHeader';

const meta = {
  title: 'Markup/Components/Calendar/MonthlyHeader',
  component: MonthlyHeader,
  argTypes: {},
} satisfies Meta<typeof MonthlyHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    year: 2024,
    month: 4,
  },
};
