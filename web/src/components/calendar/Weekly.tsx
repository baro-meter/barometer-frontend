import React from 'react';
import classNames from 'classnames/bind';
import scss from 'styles/calendar.module.scss';

const cn = classNames.bind(scss);

interface WeeklyViewProps {
  weekIdx: number;
  weekDates: number[];
  activeDate?: number; // TODO today일수도 있어서 작업 안함
}

const WeeklyView = ({weekIdx, weekDates, activeDate}: WeeklyViewProps) => {
  return (
    <div role="row" key={weekIdx} className={cn('row', 'calendar-row')}>
      {weekDates.map((d, di) => (
        <div
          className={cn('day_component', {active: activeDate === d})}
          key={weekIdx * 10 + di}>
          {d >= 1 ? d : ''}
        </div>
      ))}
    </div>
  );
};

interface WeeklyProps {
  weekIdx?: number;
  weekDates: number[];
  activeDate?: number;
  className?: string;
}

export default function Weekly({
  weekIdx = 0,
  weekDates,
  activeDate,
  className,
}: WeeklyProps) {
  const viewProps = {
    weekIdx,
    weekDates,
    activeDate,
    className,
  };
  return <WeeklyView {...viewProps} />;
}
