import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { getDayText, getFormatDayjs } from "@/utils/calendarUtil";
import MonthlyCalendar from "@/components/calendar/MonthlyCalendar";
import { getCalendarView } from "@/services/calendar/calendarService";
import { GoalType } from "@/types/goal";
import { setHttpClientCredentials } from "@/services/httpClient";
import { CalendarViewType } from "@/types/calendar";
import { useCalendar } from "@/hooks/useCalendar";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useAccessTokenValue } from "@/recoils/user";
import MissionList from "@/components/calendar/MissionFiltering";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import { selectedDayjsState } from "@/recoils/calendar";
import { useRecoilState } from "recoil";

/**
 * TODO
 * 지금 현재는 monthly이긴 한데,
 * CalendarHeader 하위에 contents 부분만 버튼 누르면 스위칭하기.
 */
interface MonthlyPageViewProps {
  year: number;
  month: number;
  date: number;
  selectedDate: dayjs.Dayjs;
  handleChangeViewMode: () => void;
  handleChangeDate: (d: dayjs.Dayjs) => void;
}

const MonthlyPageView = ({
  year,
  month,
  date,
  selectedDate,
  handleChangeViewMode,
  handleChangeDate,
}: MonthlyPageViewProps) => {
  return (
    <div className="wrap">
      <main className="main calendar">
        <CalendarHeader
          type="monthly"
          year={year}
          month={month}
          onToggleCalendarType={handleChangeViewMode}
        />
        <div className="contents">
          <div className="calendar-area">
            <MonthlyCalendar
              year={year}
              month={month}
              date={date}
              onChangeDate={handleChangeDate}
            />
          </div>
        </div>
        <MissionList type="monthly" year={year} month={month} date={date} />
      </main>
    </div>
  );
};
// Weekly -> Monthly 전환될 때 선택된 날짜를 전달 받는다.
interface MonthlyPageProps {
  monthlyGoals: GoalType[];
}

const MonthlyPage = ({}: MonthlyPageProps) => {
  // new
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDayjsState);

  const router = useRouter();

  // 이 accessToken이 있을 때만 useQuery를 실행하는 공통함수를 짜야하나?
  // TODO accessToken이 뒤늦게 설정되어서, prefetch가 정상 동작하지 않음 -> 해결책 강구.
  const accessToken = useAccessTokenValue();

  const startDate = useMemo(
    () => getFormatDayjs(selectedDate.startOf("month")),
    [selectedDate]
  );
  const endDate = useMemo(
    () => getFormatDayjs(selectedDate.endOf("month")),
    [selectedDate]
  );

  const { initBaromters, currentGoal } = useCalendar(selectedDate);
  const { data: calendarViewData } = useQuery<CalendarViewType>({
    queryKey: ["calendarViewData", startDate, endDate],
    queryFn: () => getCalendarView(startDate, endDate),
    enabled: !!accessToken,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (calendarViewData?.reports) {
      initBaromters(calendarViewData.reports);
    }
  }, [calendarViewData]);

  useEffect(() => {
    console.log("=======currentGoal========");
    console.log(currentGoal);
  }, [currentGoal]);

  const handleChangeViewMode = useCallback(() => {
    router.push(`/calendar/weekly?initDate=${getFormatDayjs(selectedDate)}`);
  }, [selectedDate]);

  const handleChangeDate = async (d: dayjs.Dayjs) => {
    console.log(`handleChangeDate: ${d}`);
    setSelectedDate(d);
  };

  const viewProps = {
    year: selectedDate.year(),
    month: selectedDate.month() + 1, // 월은 0부터 시작
    date: selectedDate.date(),
    selectedDate,
    handleChangeViewMode,
    handleChangeDate,
  };

  return <MonthlyPageView {...viewProps} />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  setHttpClientCredentials(context.req.cookies);

  const queryClient = new QueryClient();

  try {
    const current = dayjs();
    const startDate = getFormatDayjs(current.startOf("month"));
    const endDate = getFormatDayjs(current.endOf("month"));
    await queryClient.prefetchQuery({
      queryKey: ["calendarViewData", startDate, endDate],
      queryFn: () => getCalendarView(startDate, endDate),
    });
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MonthlyPage;
