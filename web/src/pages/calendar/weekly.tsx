import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import dayjs from "dayjs";
import { GetServerSidePropsContext } from "next";
import React, { useCallback, useEffect, useState } from "react";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/router";
import { getFormatDayjs } from "@/utils/calendarUtil";
import WeeklyList from "@/components/calendar/WeeklyList";
import "swiper/css";
import CalendarHeaderView from "@/markup/components/calendar/CalendarHeaderView";
import { useCalendar } from "@/hooks/useCalendar";

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(utc);

interface WeeklyPageViewProps {
  year: number;
  month: number;
  date: number;
  isToday: boolean;
  handleChangeMonthlyView: () => void;
  handleChangeSelectedDate: (d: dayjs.Dayjs) => void;
  handleClickTodayMoveBtn: () => void;
  handleChangeDate: (year: number, month: number) => void;
}

const WeeklyPageView = ({
  year,
  month,
  date,
  isToday,
  handleChangeMonthlyView,
  handleChangeSelectedDate,
  handleClickTodayMoveBtn,
  handleChangeDate,
}: WeeklyPageViewProps) => {
  return (
    <>
      <CalendarHeaderView
        type="weekly"
        year={year}
        month={month}
        isToday={isToday}
        onToggleCalendarType={handleChangeMonthlyView}
        onClickTodayMoveBtn={handleClickTodayMoveBtn}
        onChangeDate={handleChangeDate}
      />
      <WeeklyCalendar
        year={year}
        month={month}
        date={date}
        onChangeDate={handleChangeSelectedDate}
      />
      <WeeklyList year={year} month={month} date={date} />
    </>
  );
};

interface WeeklyPageProps {
  initDate?: string;
}

/**
 * 선택된 날짜 기준으로 week 구하는 법 (api 호출 기준)
 * - year: weekYear(https://day.js.org/docs/en/plugin/week-year)
 * - week: weekOfYear(https://day.js.org/docs/en/plugin/week-of-year)
 */

const WeeklyPage = ({ initDate }: WeeklyPageProps) => {
  const router = useRouter();
  // TODO 기획 측에 달력 인터랙션이 내가 이해한 것과 동일한지 확인 필요
  const [isToday, setIsToday] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs()); // 미선택은 불가능하다고 이해함

  useCalendar(selectedDate);

  useEffect(() => {
    // 날짜가 바뀔 때 마다 달력이 초기화된다.
    if (!!initDate) {
      setSelectedDate(dayjs(initDate));
    }
  }, [initDate]);

  useEffect(() => {
    const diff = selectedDate.diff(dayjs(), "days");
    setIsToday(diff === 0 && selectedDate.date() === dayjs().date());
  }, [selectedDate]);

  const handleChangeMonthlyView = useCallback(() => {
    router.push(`/calendar/monthly?initDate=${getFormatDayjs(selectedDate)}`);
  }, [selectedDate]);

  const handleChangeSelectedDate = (dayJs: dayjs.Dayjs) => {
    setSelectedDate(dayJs);
  };

  const handleClickTodayMoveBtn = () => {
    setSelectedDate(dayjs());
  };

  const handleChangeDate = (year: number, month: number) => {
    console.log(`week: ${selectedDate.week()}`);
    console.log(`weekYear: ${selectedDate.weekYear()}`);

    setSelectedDate(
      dayjs()
        .year(year)
        .month(month - 1)
        .set("date", 1)
    );
  };

  const viewProps = {
    year: selectedDate.weekYear(),
    month: selectedDate.month() + 1, // 월은 0부터 시작
    date: selectedDate.date(),
    isToday,
    handleChangeMonthlyView,
    handleChangeSelectedDate,
    handleClickTodayMoveBtn,
    handleChangeDate,
  };

  return <WeeklyPageView {...viewProps} />;
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const initDate = context.query.initDate ?? "";
  return {
    props: {
      initDate,
    },
  };
};

export default WeeklyPage;
