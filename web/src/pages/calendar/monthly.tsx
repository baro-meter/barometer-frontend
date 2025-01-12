import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { getDayText, getFormatDayjs } from "@/utils/calendarUtil";
import ProgressListView from "@/markup/components/ProgressListView";
import { ProgressProps } from "@/markup/components/ProgressView";
import MonthlyCalendar from "@/components/calendar/MonthlyCalendar";
import { getCalendarView } from "@/services/calendar/calendarService";
import { GoalCategoryType, GoalType } from "@/types/goal";
import { setHttpClientCredentials } from "@/services/httpClient";
import { CalendarViewType } from "@/types/calendar";
import { useCalendar } from "@/hooks/useCalendar";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useAccessTokenValue } from "@/recoils/user";
import SubTab from "@/markup/components/SubTab";
import TodoList from "@/components/todo/TodoList";

interface MonthlyPageViewProps {
  year: number;
  month: number;
  date: number;
  subTabTitle: string;
  selectedDate: dayjs.Dayjs;
  handleChangeViewMode: () => void;
  handleChangeDate: (d: dayjs.Dayjs) => void;
}

const MonthlyPageView = ({
  year,
  month,
  date,
  subTabTitle,
  selectedDate,
  handleChangeViewMode,
  handleChangeDate,
}: MonthlyPageViewProps) => {
  return (
    <div className="wrap">
      <main className="main">
        <div className="contents">
          <div className="calendar-area">
            <MonthlyCalendar
              year={year}
              month={month}
              date={date}
              onChangeDate={handleChangeDate}
              onChangeViewMode={handleChangeViewMode}
            />
          </div>
        </div>
        <div className="bottom-area">
          <div className="inner">
            {/* TODO 700px 이하 subTab 소거 */}
            <SubTab title={subTabTitle} hasBorder />
            <TodoList selectedDate={selectedDate} />
          </div>
        </div>
      </main>
    </div>
  );
};
// Weekly -> Monthly 전환될 때 선택된 날짜를 전달 받는다.
interface MonthlyPageProps {
  monthlyGoals: GoalType[];
  initDate?: string;
}

const MonthlyPage = ({
  initDate,
}: // calendarViewData,
// monthlyGoals, // 일단 서버사이드에서 매번 호출할 필요 없을 것 같아서 주석 처리
MonthlyPageProps) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(
    initDate ? dayjs(initDate) : dayjs()
  ); // 미선택은 불가능

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
  const subTabTitle = useMemo(() => {
    const title = selectedDate.isSame(dayjs(), "day")
      ? "TODAY"
      : getDayText(selectedDate);
    return `${selectedDate.date()}. ${title}`;
  }, [selectedDate]);

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
    subTabTitle,
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
  const initDate = (context.query?.initDate ?? "") as string;
  // let calendarViewData: CalendarViewType = { goals: [], reports: [] };

  try {
    const current = initDate ? dayjs(initDate) : dayjs();
    const startDate = getFormatDayjs(current.startOf("month"));
    const endDate = getFormatDayjs(current.endOf("month"));
    await queryClient.prefetchQuery({
      queryKey: ["calendarViewData", startDate, endDate],
      queryFn: () => getCalendarView(startDate, endDate),
    });
    // calendarViewData = await getCalendarView(
    //   getFormatDayjs(current.startOf("month")),
    //   getFormatDayjs(current.endOf("month"))
    // );
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initDate,
      // monthlyGoals,
      // calendarViewData,
    },
  };
};

export default MonthlyPage;
