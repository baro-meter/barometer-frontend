import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Weekly from "@/components/calendar/Weekly";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import DayHeader from "@/markup/components/calendar/DayHeaderView";
import { getWeeklyDateRange } from "@/utils/calendarUtil";

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

interface WeeklyCalendarViewProps {
  calendarDates: number[];
  activeDate: number;
}

const WeeklyCalendarView = ({
  calendarDates,
  activeDate,
}: WeeklyCalendarViewProps) => {
  return (
    <>
      <DayHeader />
      <Weekly weekDates={calendarDates} activeDate={activeDate} />
    </>
  );
};

interface WeeklyCalendarProps {
  year: number;
  month: number;
  date: number;
}

export default function WeeklyCalendar({
  year,
  month,
  date,
}: WeeklyCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(
    dayjs()
      .year(year)
      .month(month - 1)
      .set("date", date)
  );
  const [calendarDates, setCalendarDates] = useState<number[]>(new Array(7));

  useEffect(() => {
    setSelectedDate(
      dayjs()
        .year(year)
        .month(month - 1)
        .set("date", date)
    );
  }, [year, month, date]);

  useEffect(() => {
    // weeklyView는 오늘 기준 일주일만 보여준다. 따라서, 이번주의 weekly date를 구한다.
    const dates = new Array(7);
    const { startDate } = getWeeklyDateRange(selectedDate);
    for (let i = 0; i < 7; i++) {
      dates.push(startDate.add(i, "day").date());
    }
    setCalendarDates(dates);
  }, [selectedDate]);

  const viewProps = {
    calendarDates,
    activeDate: date,
  };

  return <WeeklyCalendarView {...viewProps} />;
}
