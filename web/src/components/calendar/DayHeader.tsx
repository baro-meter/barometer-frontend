import React from 'react';
import classNames from 'classnames/bind';
import scss from 'styles/calendar.module.scss';

const cn = classNames.bind(scss);

interface DayHeaderViewProps {
  days: string[];
}

const DayHeaderView = ({days}: DayHeaderViewProps) => {
  return (
    <div role="rowgroup">
      <div role="row" className={cn('row')}>
        {days.map(day => (
          <span role="columnheader" className={cn('day_header')} key={day}>
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

interface DayHeaderProps {}

export default function DayHeader({}: DayHeaderProps) {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const viewProps = {days};

  return <DayHeaderView {...viewProps} />;
}
