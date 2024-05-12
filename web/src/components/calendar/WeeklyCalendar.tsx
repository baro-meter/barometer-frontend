import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames/bind";
import scss from "styles/components/calendar.module.scss";
import dayjs from "dayjs";
import DayHeader from "./DayHeader";
import Weekly from "./Weekly";
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

// TODO 오늘 기준으로만 보여지는게 아니라 특정 일 기준으로 보여줘야 한다면 기능 수정 필요!!
export default function WeeklyCalendar({
  year,
  month,
  date,
  onChangeDate,
}: WeeklyCalendarProps) {
  // const [activeDate, setActiveDate] = useState(dayjs().date()); // TODO today일수도 있어서 작업 안함
  const [dayjsObject, setDayjsObject] = useState<dayjs.Dayjs>(
    dayjs()
      .year(year)
      .set("month", month - 1)
  );
  const [calendarDates, setCalendarDates] = useState<number[]>(new Array(7));

  // 입력받은 날짜 기준으로 날짜 계산
  useEffect(() => {
    console.log(dayjsObject);
  }, [dayjsObject]);

  useEffect(() => {
    console.log(`year: ${year} / month: ${month} / date: ${date}`);

    setDayjsObject(
      dayjs()
        .year(year)
        .set("month", month - 1)
        .set("date", date)
    );
  }, [year, month, date]);

  useEffect(() => {
    // weeklyView는 오늘 기준 일주일만 보여준다. 따라서, 이번주의 weekly date를 구한다.
    const dates = new Array(7);
    let startDate = dayjsObject.day(0);
    for (let i = 0; i < 7; i++) {
      dates.push(startDate.add(i, "day").date());
    }
    setCalendarDates(dates);
  }, [dayjsObject]);

  const handleClickDate = (d: number) => {
    // setActiveDate(d);
    if (onChangeDate) {
      onChangeDate(d);
    }
  };

  const viewProps = { calendarDates, activeDate: date, handleClickDate };

  return <WeeklyCalendarView {...viewProps} />;
}
