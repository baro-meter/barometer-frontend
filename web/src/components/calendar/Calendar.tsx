import React, {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import scss from 'styles/calendar.module.scss';
import dayjs from 'dayjs';

const cn = classNames.bind(scss);

interface CalendarViewProps {
  days: string[];
  calendarDates: number[][];
}

const CalendarView = ({days, calendarDates}: CalendarViewProps) => {
  return (
    <div className={cn('container')} role="grid">
      <div role="rowgroup" className={cn('rowgroup')}>
        <div role="row" className={cn('row')}>
          {days.map(day => (
            <span role="columnheader" className={cn('day_header')} key={day}>
              {day}
            </span>
          ))}
        </div>
      </div>
      <div role="rowgroup">
        {calendarDates.map((w, i) => (
          <div role="row" key={i}>
            {w.map((d, di) => (
              <div className={cn('day_component')} key={i * 10 + di}>
                {d >= 1 ? d : ''}
              </div>
            ))}
          </div>
        ))}
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
  const [calendarDates, setCalendarDates] = useState<number[][]>(
    Array.from(Array(6), () => new Array(7)),
  );

  useEffect(() => {
    // 날짜가 바뀔 때 마다 달력이 초기화된다.
    let targetDate = dayjs(); // 현재 날짜 기준
    if (year) {
      targetDate = targetDate.year(year);
    }
    if (month) {
      targetDate = targetDate.month(month - 1);
    }
    setDayjsObject(targetDate);
  }, [month, year]);

  useEffect(() => {
    // 1일 기준으로 달력을 채운다.
    let day = dayjsObject.date(1).day();
    let date = 1;

    const dates = Array.from(Array(6), () => new Array(7).fill(0));
    const maxDate = dayjsObject.daysInMonth();
    // 첫째 주
    while (day < 7) {
      dates[0][day++] = date++;
    }
    // 나머지
    for (let w = 1; w < 6; w++) {
      for (let d = 0; d < 7; d++) {
        dates[w][d] = date++;
        if (maxDate < date) break;
      }
      if (maxDate < date) break;
    }
    setCalendarDates(dates);
  }, [dayjsObject]);

  const viewProps = {days, calendarDates};

  return <CalendarView {...viewProps} />;
}
