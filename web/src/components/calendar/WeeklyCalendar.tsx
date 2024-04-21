import React, {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import scss from 'styles/components/calendar.module.scss';
import dayjs from 'dayjs';
import DayHeader from './DayHeader';
import Weekly from './Weekly';

const cn = classNames.bind(scss);

interface WeeklyCalendarViewProps {
  calendarDates: number[];
  activeDate: number;
}

const WeeklyCalendarView = ({calendarDates}: WeeklyCalendarViewProps) => {
  return (
    <div className={cn('container')} role="grid">
      <DayHeader />
      <div role="rowgroup">
        <Weekly weekDates={calendarDates} />
      </div>
    </div>
  );
};

// TODO 오늘 기준으로만 보여지는게 아니라 특정 일 기준으로 보여줘야 한다면 기능 수정 필요!!
export default function Calendar() {
  const [activeDate, setActiveDate] = useState(dayjs().date()); // TODO today일수도 있어서 작업 안함
  const [dayjsObject, setDayjsObject] = useState<dayjs.Dayjs>(dayjs());
  const [calendarDates, setCalendarDates] = useState<number[]>(new Array(7));

  useEffect(() => {
    // weeklyView는 오늘 기준 일주일만 보여준다. 따라서, 이번주의 weekly date를 구한다.
    let day = dayjsObject.day();
    // 일요일부터 채운다.
    // ex - 오늘 = 6이다. 오늘 날짜 기준으로 -(오늘) 부터 채운다.
    const dates = new Array(7);
    let startDate = dayjsObject.date() - day;
    for (let i = 0; i < 7; i++) {
      dates.push(startDate + i);
    }
    setCalendarDates(dates);
  }, [dayjsObject]);

  const viewProps = {calendarDates, activeDate};

  return <WeeklyCalendarView {...viewProps} />;
}
