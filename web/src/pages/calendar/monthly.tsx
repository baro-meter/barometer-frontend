import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { getFormatDayjs } from "@/utils/calendarUtil";
import ProgressListView from "@/markup/components/ProgressListView";
import { ProgressProps } from "@/markup/components/ProgressView";
import MonthlyCalendar from "@/components/calendar/MonthlyCalendar";
import { getCalendarView } from "@/services/calendar/calendarService";
import { GoalType } from "@/types/goal";
import { setHttpClientCredentials } from "@/services/httpClient";
import { CalendarViewType } from "@/types/calendar";
import { useCalendar } from "@/hooks/useCalendar";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useAccessTokenValue } from "@/recoils/user";
import SubTab from "@/markup/components/SubTab";
import CategoryLabel from "@/markup/components/CategoryLabel";

interface MonthlyPageViewProps {
  year: number;
  month: number;
  date: number;
  progressList: ProgressProps[];
  handleChangeViewMode: () => void;
  handleChangeDate: (d: dayjs.Dayjs) => void;
}

const MonthlyPageView = ({
  year,
  month,
  date,
  progressList,
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
            <SubTab title="15.TODAY" hasBorder />
            <div className="tab-area">
              <CategoryLabel />
              <ProgressListView
                alignment="horizontal"
                progressList={progressList}
              />
            </div>
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
  // calendarViewData: CalendarViewType;
}

const MonthlyPage = ({
  initDate,
}: // calendarViewData,
// monthlyGoals, // 일단 서버사이드에서 매번 호출할 필요 없을 것 같아서 주석 처리
MonthlyPageProps) => {
  const testData = [
    { task: "일이삼사오육칠팔", width: 70, count: "2번" },
    { task: "걸어서 회사가기", width: 10, count: "매일" },
    { task: "우유 한잔 마시기", width: 50, count: "4번" },
    { task: "근력 운동 하기", width: 20, count: "2번", isActive: true },
    {
      task: "출퇴근할때 계단으로 오르내리기 더써볼까 이거 계속늘어남 이게 맞을까~~~~?",
      width: 90,
      count: "1번",
    },
    { task: "이제 더이상 할게 없는데", width: 80, count: "2번" },
    {
      task: "모름..",
      width: 60,
      count: "2번",
      isActive: true,
    },
  ];

  const router = useRouter();
  // TODO 기획 측에 달력 인터랙션이 내가 이해한 것과 동일한지 확인 필요
  const [selectedDate, setSelectedDate] = useState(
    initDate ? dayjs(initDate) : dayjs()
  ); // 미선택은 불가능하다고 이해함
  const [progressList, setProgressList] = useState(testData);

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

  useCalendar(selectedDate);
  const { data: calendarViewData } = useQuery<CalendarViewType>({
    queryKey: ["calendarViewData", startDate, endDate],
    queryFn: () => getCalendarView(startDate, endDate),
    enabled: !!accessToken,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    console.log(`selectedDate: ${getFormatDayjs(selectedDate)}`);
  }, [selectedDate]);

  useEffect(() => {
    console.log(`initDate: ${initDate}`);
  }, [initDate]);

  useEffect(() => {
    console.log(calendarViewData);
  }, [calendarViewData]);

  const handleChangeViewMode = useCallback(() => {
    router.push(`/calendar/weekly?initDate=${getFormatDayjs(selectedDate)}`);
  }, [selectedDate]);

  const handleChangeDate = async (d: dayjs.Dayjs) => {
    setSelectedDate(d);
  };

  const viewProps = {
    year: selectedDate.year(),
    month: selectedDate.month() + 1, // 월은 0부터 시작
    date: selectedDate.date(),
    progressList,
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
