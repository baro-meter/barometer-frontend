import React, {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import scss from 'styles/calendar.module.scss';
import dayjs from 'dayjs';

const cn = classNames.bind(scss);

interface CalendarViewProps {
  days: string[];
}

const CalendarView = ({days}: CalendarViewProps) => {
  return (
    <div className={cn('container')} role="grid">
      <div role="rowgroup" className={cn('rowgroup')}>
        <div role="row" className={cn('row')}>
          {days.map(day => (
            <span role="columnheader" className={cn('day_header')}>
              {day}
            </span>
          ))}
        </div>
      </div>
      <div role="rowgroup">
        <div role="row">
          <div className={cn('day_component')}>a</div>
          <div className={cn('day_component')}>a</div>
          <div className={cn('day_component')}>a</div>
          <div className={cn('day_component')}>a</div>
          <div className={cn('day_component')}>a</div>
          <div className={cn('day_component')}>a</div>
          <div className={cn('day_component')}>a</div>
        </div>
        <div role="row">
          <div className={cn('day_component')}>a</div>
          <div className={cn('day_component')}>a</div>
          <div className={cn('day_component')}>a</div>
          <div className={cn('day_component')}>a</div>
          <div className={cn('day_component')}>a</div>
          <div className={cn('day_component')}>a</div>
          <div className={cn('day_component')}>a</div>
        </div>
      </div>
    </div>
  );
};

interface CalendarProps {
  year?: number;
  month?: number;
}

export default function Calendar({year, month}: CalendarProps) {
  const [dayjsObject, setDayjsObject] = useState<dayjs.Dayjs>(dayjs());
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const viewProps = {days};

  useEffect(() => {
    // 날짜가 바뀔 때 마다 달력이 초기화된다.
    if (!month) {
      // 현재 날짜 기준
      setDayjsObject(dayjs());
    }
  }, [month]);

  return <CalendarView {...viewProps} />;
}
