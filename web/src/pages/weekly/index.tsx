import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import dayjs from "dayjs";
import { GetServerSidePropsContext } from "next";
import React, { useEffect, useMemo, useState } from "react";
import weekOfYear from "dayjs/plugin/weekOfYear";
import utc from "dayjs/plugin/utc";
import { getFormatDayjs, getWeeklyDateRange } from "@/utils/calendarUtil";
import WeeklyList from "@/components/calendar/MissionList";
import "swiper/css";
import { useCalendar } from "@/hooks/useCalendar";
import { useQuery } from "@tanstack/react-query";
import { getCalendarView } from "@/services/calendar/calendarService";
import { CalendarViewType } from "@/types/calendar";
import { useAccessTokenValue } from "@/recoils/user";
import Header from "@/markup/components/HeaderView";

dayjs.extend(weekOfYear);
dayjs.extend(utc);

interface WeeklyPageViewProps {
  isLastWeek: boolean;
  year: number;
  month: number;
  date: number;
}

const WeeklyPageView = ({
  isLastWeek,
  year,
  month,
  date,
}: WeeklyPageViewProps) => {
  return (
    <div className="wrap">
      {/* weekly: main에 weekly-view 클래스 추가 (하단 bottom-area가 스크롤 될 수 있도록) */}
      <main className="main calendar weekly-view">
        <Header
          headerType="basic"
          titleText={isLastWeek ? "LAST WEEK" : "THIS WEEK"}
        />
        <div className="contents">
          <div className="calendar-area">
            <WeeklyCalendar year={year} month={month} date={date} />
          </div>
        </div>
        <WeeklyList type="weekly" year={year} month={month} date={date} />
      </main>
    </div>
  );
};

interface WeeklyPageProps {
  isLastWeek?: boolean;
}

/**
 * 선택된 날짜 기준으로 week 구하는 법 (api 호출 기준)
 * - year: weekYear(https://day.js.org/docs/en/plugin/week-year)
 * - week: weekOfYear(https://day.js.org/docs/en/plugin/week-of-year)
 */

const WeeklyPage = ({ isLastWeek }: WeeklyPageProps) => {
  //
  /**
   * TODO 마지막 접속일자 react-native로 부터 받아와야 함
   * - 마지막 접속일자가 저번주인 경우에만 api 찔러서 LAST WEEK 표시 여부 확인 필요
   */

  const [currentDate, setCurrentDate] = useState(dayjs());
  // const [currentDate, setCurrentDate] = useState(dayjs("2024-10-28"));

  if (isLastWeek === undefined) {
    return <></>;
  }

  useEffect(() => {
    if (isLastWeek) {
      setCurrentDate(dayjs().subtract(7, "day"));
    }
  }, [isLastWeek]);

  // 이 accessToken이 있을 때만 useQuery를 실행하는 공통함수를 짜야하나?
  // TODO accessToken이 뒤늦게 설정되어서, prefetch가 정상 동작하지 않음 -> 해결책 강구.
  const accessToken = useAccessTokenValue();

  const startDate = useMemo(() => {
    const { startDate } = getWeeklyDateRange(currentDate);
    return getFormatDayjs(startDate);
  }, [currentDate]);

  const endDate = useMemo(() => {
    const { endDate } = getWeeklyDateRange(currentDate);
    return getFormatDayjs(endDate);
  }, [currentDate]);

  const { initBaromters, currentGoal } = useCalendar(currentDate);
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

  const viewProps = {
    isLastWeek,
    year: currentDate.year(),
    month: currentDate.month() + 1, // 월은 0부터 시작
    date: currentDate.date(),
  };

  return <WeeklyPageView {...viewProps} />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  /** TODO
   * react-native로 부터 데이터 가져와서, 저번주인 경우 api 찔러 last week로 가야하는지 여부 보냄
   */
  // const queryClient = new QueryClient();
  // const initDate = (context.query?.initDate ?? "") as string;

  // const current = initDate ? dayjs(initDate) : dayjs();
  // const { startDate, endDate } = getWeeklyDateRange(current);
  // await queryClient.prefetchQuery({
  //   queryKey: ["calendarViewData", startDate, endDate],
  //   queryFn: () =>
  //     getCalendarView(getFormatDayjs(startDate), getFormatDayjs(endDate)),
  // });
  const isLastWeek = false;

  return {
    props: {
      isLastWeek,
    },
  };
};

export default WeeklyPage;
