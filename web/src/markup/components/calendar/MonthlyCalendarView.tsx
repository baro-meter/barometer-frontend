import React, { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/calendar.module.scss";
import dayjs from "dayjs";
import DayHeader from "@/markup/components/calendar/DayHeaderView";
import Weekly from "@/markup/components/calendar/WeeklyView";

const cn = classNames.bind(scss);

interface MonthlyCalendarViewProps {
  calendarDates: number[][];
  activeDate: number;
  layoutRef: React.MutableRefObject<HTMLDivElement | null>;
  isSixWeeks: boolean;
}

const MonthlyCalendarView = ({
  calendarDates,
  activeDate,
  layoutRef,
  isSixWeeks,
}: MonthlyCalendarViewProps) => {
  return (
    <div className={cn("container")} role="grid">
      <DayHeader />
      <div role="rowgroup" className={cn("calendar")} ref={layoutRef}>
        {calendarDates.map((w, i) =>
          !isSixWeeks && i === 5 ? (
            <></>
          ) : (
            <>
              <Weekly
                key={i}
                weekIdx={i}
                weekDates={w}
                activeDate={activeDate}
              />
            </>
          )
        )}
      </div>
    </div>
  );
};

interface MonthlyCalendarProps {
  year: number;
  month: number;
  date: number; // 선택된 날짜
}

export default function MonthlyCalendar({
  year,
  month,
  date,
}: MonthlyCalendarProps) {
  const [activeDate, setActiveDate] = useState(1); // TODO 기준을 모르겠어서 일단 오늘로만 작업
  const [dayjsObject, setDayjsObject] = useState<dayjs.Dayjs>(
    dayjs()
      .year(year)
      .month(month - 1)
      .set("date", date)
  );
  const [calendarDates, setCalendarDates] = useState<number[][]>(
    Array.from(Array(6), () => new Array(7))
  );
  // TODO 전체 페이지 스크롤이 되어야 하는 경우 props로 받고 페이지 단위에서 처리 필요
  // 우선은 해당 캘린더 내부에서만 스크롤 될 수 있게 한다.
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const layoutRef = useRef<HTMLDivElement>(null);

  const isSixWeeks = useMemo(() => {
    return calendarDates[5][0] > 0;
  }, [calendarDates]);

  useEffect(() => {
    if (date) {
      setActiveDate(date);
    }
  }, [date]);

  useEffect(() => {
    setDayjsObject(
      dayjs()
        .year(year)
        .month(month - 1)
        .set("date", date)
    );
  }, [month, year, date]);

  // useEffect(() => {
  //   // 날짜가 바뀔 때 마다 달력이 초기화된다.
  //   let targetDate = dayjs(); // 현재 날짜 기준
  //   if (year) {
  //     targetDate = targetDate.year(year);
  //   }
  //   if (month) {
  //     targetDate = targetDate.month(month - 1);
  //   }

  //   if (date && date > 0) {
  //     setActiveDate(date);
  //   } else {
  //     const today = dayjs();
  //     if (year === today.year() && month === today.month() + 1) {
  //       setActiveDate(today.date());
  //     } else {
  //       setActiveDate(0);
  //     }
  //   }

  //   setDayjsObject(targetDate);
  // }, [month, year]);
  useEffect(() => {
    // 1일 기준으로 달력을 채운다.
    let day = dayjsObject.date(1).day();
    let date = 1;

    const dates = Array.from(Array(6), () => new Array(7).fill(0));
    const maxDate = dayjsObject.daysInMonth();

    const today = dayjs();
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
  }, [dayjsObject, month]);

  useEffect(() => {
    const handleScroll = () => {
      if (calendarDates[5][0] > 0 && layoutRef.current) {
        const scrollTop = layoutRef?.current?.scrollTop;
        if (scrollTop > lastScrollTop) {
          // 아래 방향
          layoutRef.current.scrollTop = layoutRef.current.clientHeight;
        } else {
          layoutRef.current.scrollTop = 0;
        }
      }
    };

    if (layoutRef.current) {
      layoutRef.current.addEventListener("scroll", handleScroll);
      return () =>
        layoutRef.current?.removeEventListener("scroll", handleScroll);
    }
  }, [calendarDates, layoutRef]);

  const viewProps = {
    calendarDates,
    activeDate,
    layoutRef,
    isSixWeeks,
  };

  return <MonthlyCalendarView {...viewProps} />;
}
