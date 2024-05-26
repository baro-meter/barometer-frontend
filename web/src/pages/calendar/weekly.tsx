import WeeklyCalendar from "@/components/Calendar/WeeklyCalendar";
import dayjs from "dayjs";
import WeeklyHeaderView from "markup/components/Calendar/WeeklyHeaderView";
import { GetServerSidePropsContext } from "next";
import React, { useCallback, useEffect, useState } from "react";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { useRouter } from "next/router";
import { getFormatDayjs } from "utils/calendarUtil";
import WeeklyList from "@/components/Calendar/WeeklyList";

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

interface WeeklyPageViewProps {
  year: number;
  month: number;
  week: number;
  date: number;
  handleChangeMonthlyView: () => void;
  handleChangeSelectedDate: (d: number) => void;
}

const WeeklyPageView = ({
  year,
  month,
  week,
  date,
  handleChangeMonthlyView,
  handleChangeSelectedDate,
}: WeeklyPageViewProps) => {
  return (
    <>
      <WeeklyHeaderView
        year={year}
        month={month}
        week={week}
        handleChangeMonthlyView={handleChangeMonthlyView}
      />
      <WeeklyCalendar
        year={year}
        month={month}
        date={date}
        onChangeDate={handleChangeSelectedDate}
      />
      <WeeklyList />
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
  const [selectedDate, setSelectedDate] = useState(dayjs()); // 미선택은 불가능하다고 이해함

  useEffect(() => {
    // 날짜가 바뀔 때 마다 달력이 초기화된다.
    if (!!initDate) {
      setSelectedDate(dayjs(initDate));
      console.log(`adfadsfasdfasdf: ${dayjs(initDate)}`);
    }
  }, [initDate]);

  const handleChangeMonthlyView = useCallback(() => {
    router.push(`/calendar/monthly?initDate=${getFormatDayjs(selectedDate)}`);
  }, [selectedDate]);

  const handleChangeSelectedDate = (d: number) => {
    setSelectedDate(selectedDate.set("date", d));
  };

  const viewProps = {
    year: selectedDate.year(),
    month: selectedDate.month() + 1, // 월은 0부터 시작
    week: selectedDate.week(),
    date: selectedDate.date(),
    handleChangeMonthlyView,
    handleChangeSelectedDate,
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
