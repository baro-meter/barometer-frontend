import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/calendar.module.scss";
import dayjs from "dayjs";
import DayHeader from "@/components/calendar/DayHeader";
import Weekly from "@/components/calendar/Weekly";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const cn = classNames.bind(scss);

interface WeeklyCalendarViewProps {
  calendarDates: number[];
  activeDate: number;
  handleClickDate: (d: number) => void;
}

const WeeklyCalendarView = ({
  calendarDates,
  activeDate,
  handleClickDate,
}: WeeklyCalendarViewProps) => {
  return (
    <div className={cn("container")} role="grid">
      <DayHeader />
      <div role="rowgroup">
        <Weekly
          weekDates={calendarDates}
          activeDate={activeDate}
          onClickDate={handleClickDate}
        />
      </div>
    </div>
  );
};

interface WeeklyCalendarProps {
  year: number;
  month: number;
  date: number;
  onChangeDate?: (d: number) => void;
}

export default function WeeklyCalendar({
  year,
  month,
  date,
  onChangeDate,
}: WeeklyCalendarProps) {
  const [week, setWeek] = useState(
    dayjs()
      .year(year)
      .month(month - 1)
      .set("date", date)
      .week()
  );
  const [calendarDates, setCalendarDates] = useState<number[]>(new Array(7));

  useEffect(() => {
    setWeek(
      dayjs()
        .year(year)
        .month(month - 1)
        .set("date", date)
        .week()
    );
  }, [year, month, date]);

  useEffect(() => {
    // weeklyView는 오늘 기준 일주일만 보여준다. 따라서, 이번주의 weekly date를 구한다.
    const dates = new Array(7);
    let startDate = dayjs().year(year).week(week).day(0);
    for (let i = 0; i < 7; i++) {
      dates.push(startDate.add(i, "day").date());
    }
    setCalendarDates(dates);
  }, [year, week]);

  const handleClickDate = (d: number) => {
    if (onChangeDate) {
      onChangeDate(d);
    }
  };

  const viewProps = { calendarDates, activeDate: date, handleClickDate };

  return <WeeklyCalendarView {...viewProps} />;
}
