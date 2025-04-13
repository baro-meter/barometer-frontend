import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { getFormatDayjs } from "@/utils/calendarUtil";
import MonthlyCalendar from "@/components/calendar/MonthlyCalendar";
import { getCalendarView } from "@/services/calendar/calendarService";
import { GoalType } from "@/types/goal";
import { setHttpClientCredentials } from "@/services/httpClient";
import { CalendarViewType, ReportViewType } from "@/types/calendar";
import { useCalendar } from "@/hooks/useCalendar";
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

const cn = classNames.bind(scss);
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
            {selectedViewType === ReportViewType.WEEKLY && (
              <WeeklyCalendar year={year} month={month} date={date} />
            )}
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
  const [selectedViewType, setSelectedViewType] =
    useRecoilState(selectedViewState);
  const setSelectedTab = useSetRecoilState(selectedTabState);

  useEffect(() => {
    setSelectedTab(TabEnum.REPORT);
  }, []);

  // 이 accessToken이 있을 때만 useQuery를 실행하는 공통함수를 짜야하나?
  // TODO accessToken이 뒤늦게 설정되어서, prefetch가 정상 동작하지 않음 -> 해결책 강구.
  const accessToken = useAccessTokenValue();

  // const startDate = useMemo(
  //   () => getFormatDayjs(selectedDate.startOf("month")),
  //   [selectedDate]
  // );
  const startDate = useMemo(() => {
    console.log(selectedDate);
    return getFormatDayjs(selectedDate.startOf("month"));
  }, [selectedDate, selectedViewType]);
  const endDate = useMemo(
    () => getFormatDayjs(selectedDate.endOf("month")),
    [selectedDate, selectedViewType]
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
