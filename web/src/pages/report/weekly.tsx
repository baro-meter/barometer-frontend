import dayjs from "dayjs";
import React, { useCallback, useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { getWeeklyCalendarView } from "@/services/calendar/calendarService";
import { setHttpClientCredentials } from "@/services/httpClient";
import { ReportViewType, WeeklyCalendarViewType } from "@/types/calendar";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useAccessTokenValue } from "@/recoils/user";
import MissionList from "@/components/calendar/MissionFiltering";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import {
  selectedDayjsState,
  selectedViewState,
  weeklyCalendarViewState,
} from "@/recoils/calendar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import { selectedTabState } from "@/recoils/tab";
import { TabEnum } from "@/types/tab";
import classNames from "classnames";
import scss from "@/styles/components/calendar.module.scss";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);
const cn = classNames.bind(scss);
interface MonthlyPageViewProps {
  year: number;
  month: number;
  selectedViewType: ReportViewType;
  handleChangeViewMode: () => void;
}
const MonthlyPageView = ({
  year,
  month,
  selectedViewType,
  handleChangeViewMode,
}: MonthlyPageViewProps) => {
  return (
    <div className="wrap">
      <main className={cn("main", "calendar", "weekly-view")}>
        <CalendarHeader
          type={selectedViewType}
          year={year}
          month={month}
          onToggleCalendarType={handleChangeViewMode}
        />
        <div className="contents">
          <div className="calendar-area">
            <WeeklyCalendar />
          </div>
        </div>
        <MissionList type={selectedViewType} />
      </main>
    </div>
  );
};
// Weekly -> Monthly 전환될 때 선택된 날짜를 전달 받는다.
interface WeeklyReportPageProps {}

/**
 * TODO
 * weeklyPage로만 작업할 것. monthly 페이지는 별도 페이지에서 관리 (각 페이지에서 필요한 api 호출)
 * 그리고 weeklyCalendarViewState 가 undefined여서 무한 호출 일어나는 것 같다. 설정 할 것
 * @param param0
 * @returns
 */
const WeeklyReportPage = ({}: WeeklyReportPageProps) => {
  const selectedDate = useRecoilValue(selectedDayjsState);
  const setWeeklyCalendarView = useSetRecoilState(weeklyCalendarViewState);
  const [selectedViewType, setSelectedViewType] =
    useRecoilState(selectedViewState);
  const setSelectedTab = useSetRecoilState(selectedTabState);

  useEffect(() => {
    setSelectedViewType(ReportViewType.WEEKLY);
    setSelectedTab(TabEnum.REPORT);
  }, []);

  // 이 accessToken이 있을 때만 useQuery를 실행하는 공통함수를 짜야하나?
  // TODO accessToken이 뒤늦게 설정되어서, prefetch가 정상 동작하지 않음 -> 해결책 강구.
  const accessToken = useAccessTokenValue();

  // TODO hook 공통화?
  const { data: calendarViewData } = useQuery<WeeklyCalendarViewType>({
    queryKey: ["weeklyViewData", selectedDate.year(), selectedDate.week()],
    queryFn: () =>
      getWeeklyCalendarView(selectedDate.year(), selectedDate.week()),
    enabled: !!accessToken,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    setWeeklyCalendarView(calendarViewData);
  }, [calendarViewData]);

  // TODO router 이동 처리 (/report/monthly)
  const handleChangeViewMode = useCallback(() => {
    if (selectedViewType === ReportViewType.MONTHLY) {
      setSelectedViewType(ReportViewType.WEEKLY);
    } else {
      setSelectedViewType(ReportViewType.MONTHLY);
    }
  }, [selectedViewType]);

  const viewProps = {
    year: selectedDate.year(),
    month: selectedDate.month() + 1, // 월은 0부터 시작
    selectedViewType,
    handleChangeViewMode,
  };

  return <MonthlyPageView {...viewProps} />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  setHttpClientCredentials(context.req.cookies);

  const queryClient = new QueryClient();

  // weekly
  try {
    const current = dayjs();
    const year = current.year();
    const week = current.week();
    await queryClient.prefetchQuery({
      queryKey: ["weeklyViewData", year, week],
      queryFn: () => getWeeklyCalendarView(year, week),
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

export default WeeklyReportPage;
