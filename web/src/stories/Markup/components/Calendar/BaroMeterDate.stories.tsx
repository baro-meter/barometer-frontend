import type { Meta, StoryObj } from '@storybook/react';
import BaroMeterDateView from 'markup/components/Calendar/BaroMeterDateView';

const meta = {
  title: 'Markup/Components/Calendar/Common/BaroMeterDate',
  component: BaroMeterDateView,
  argTypes: {
  },
} satisfies Meta<typeof BaroMeterDateView>;

export default meta;
type Story = StoryObj<typeof BaroMeterDateView>;

export const Showcase: Story = {
  render: () => (
    <>
      <BaroMeterDateView date={10} score={0} successGoalCount={0} />
      <BaroMeterDateView date={10} score={0} successGoalCount={4} />
      <BaroMeterDateView date={10} score={0} successGoalCount={3} isActive={true} />
      <BaroMeterDateView date={1} score={1} successGoalCount={1} />
      <BaroMeterDateView date={1} score={1} successGoalCount={1} isActive={true} />
      <BaroMeterDateView date={2} score={2} successGoalCount={2} />
      <BaroMeterDateView date={2} score={2} successGoalCount={2} isActive={true} />
      <BaroMeterDateView date={3} score={3} successGoalCount={3} />
      <BaroMeterDateView date={3} score={3} successGoalCount={3} isActive={true} />
      <BaroMeterDateView date={3} score={4} successGoalCount={4} />
      <BaroMeterDateView date={3} score={4} successGoalCount={4} isActive={true} />
      <BaroMeterDateView date={3} score={2} successGoalCount={5} />
      <BaroMeterDateView date={3} score={2} successGoalCount={5} isActive={true} />
    </>
  )
};
