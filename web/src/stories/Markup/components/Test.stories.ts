import type {Meta, StoryObj} from '@storybook/react';

import Calendar from 'markup/components/Calendar';

const meta = {
  title: 'Markup/Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
