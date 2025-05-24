import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo } from "react";
import { GetServerSidePropsContext } from "next";
import {
  getCalendarView,
  getMonthlyCalendarView,
} from "@/services/calendar/calendarService";
import { GoalType } from "@/types/goal";
import { setHttpClientCredentials } from "@/services/httpClient";
import {
  CalendarViewType,
  MonthlyCalendarViewType,
  ReportViewType,
} from "@/types/calendar";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useAccessTokenValue } from "@/recoils/user";
import MissionList from "@/components/calendar/MissionFiltering";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import { selectedDayjsState, selectedViewState } from "@/recoils/calendar";
import { useRecoilState, useSetRecoilState } from "recoil";
import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import { selectedTabState } from "@/recoils/tab";
import { TabEnum } from "@/types/tab";
import classNames from "classnames";
import scss from "@/styles/components/calendar.module.scss";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { getYearWeekText } from "@/utils/calendarUtil";
import MonthlyCalendar from "@/components/calendar/MonthlyCalendar";

dayjs.extend(weekOfYear);
const cn = classNames.bind(scss);
interface MonthlyPageViewProps {
  year: number;
  month: number;
  date: number;
  selectedDate: dayjs.Dayjs;
  selectedViewType: ReportViewType;
  handleChangeViewMode: () => void;
  handleChangeDate: (d: dayjs.Dayjs) => void;
}

const MonthlyPageView = ({
  year,
  month,
  date,
  selectedDate,
  selectedViewType,
  handleChangeViewMode,
  handleChangeDate,
}: MonthlyPageViewProps) => {
  return (
    <div className="wrap">
      <main
        className={cn(
          "main",
          "calendar",
          selectedViewType === ReportViewType.WEEKLY && "weekly-view"
        )}
      >
        <CalendarHeader
          type={selectedViewType}
          year={year}
          month={month}
          onToggleCalendarType={handleChangeViewMode}
        />
        <div className="contents">
          <div className="calendar-area">
            {selectedViewType === ReportViewType.MONTHLY && (
              <MonthlyCalendar
                year={year}
                month={month}
                date={date}
                onChangeDate={handleChangeDate}
              />
            )}
            {selectedViewType === ReportViewType.WEEKLY && <WeeklyCalendar />}
          </div>
        </div>
        <MissionList type={selectedViewType} />
      </main>
    </div>
  );
};
// Weekly -> Monthly 전환될 때 선택된 날짜를 전달 받는다.
interface ReportPageProps {
  monthlyGoals: GoalType[];
}

/**
 * TODO
 * weeklyPage로만 작업할 것. monthly 페이지는 별도 페이지에서 관리 (각 페이지에서 필요한 api 호출)
 * 그리고 weeklyCalendarViewState 가 undefined여서 무한 호출 일어나는 것 같다. 설정 할 것
 * @param param0
 * @returns
 */
const ReportPage = ({}: ReportPageProps) => {
  // new
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDayjsState);
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

  const yearWeek = useMemo(() => getYearWeekText(selectedDate), [selectedDate]);
  const { data: calendarViewData } = useQuery<MonthlyCalendarViewType>({
    queryKey: ["monthlyViewData", yearWeek],
    queryFn: () => getMonthlyCalendarView(yearWeek),
    enabled: !!accessToken,
    staleTime: 1000 * 60,
  });

  const handleChangeViewMode = useCallback(() => {
    if (selectedViewType === ReportViewType.MONTHLY) {
      setSelectedViewType(ReportViewType.WEEKLY);
    } else {
      setSelectedViewType(ReportViewType.MONTHLY);
    }
  }, [selectedViewType]);

  // TODO click event handler로 변경
  const handleChangeDate = async (d: dayjs.Dayjs) => {
    setSelectedViewType(ReportViewType.WEEKLY);
    setSelectedDate(d);
  };

  const viewProps = {
    year: selectedDate.year(),
    month: selectedDate.month() + 1, // 월은 0부터 시작
    date: selectedDate.date(),
    selectedDate,
    selectedViewType,
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

  // monthly
  try {
    const current = dayjs();
    const yearWeek = getYearWeekText(current);
    await queryClient.prefetchQuery({
      queryKey: ["monthlyViewData", yearWeek],
      queryFn: () => getMonthlyCalendarView(yearWeek),
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

export default ReportPage;
