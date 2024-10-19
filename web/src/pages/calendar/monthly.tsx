import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { getFormatDayjs } from "@/utils/calendarUtil";
import ProgressListView from "@/markup/components/ProgressListView";
import { ProgressProps } from "@/markup/components/ProgressView";
import MonthlyCalendar from "@/components/calendar/MonthlyCalendar";
import { getGoals } from "@/services/calendar/calendarService";
import { GoalType } from "@/types/goal";
import { setHttpClientCredentials } from "@/services/httpClient";

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
    <>
      <MonthlyCalendar
        year={year}
        month={month}
        date={date}
        onChangeDate={handleChangeDate}
        onChangeViewMode={handleChangeViewMode}
      />
      {/* TODO 마크업 필요 */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          margin: "20px",
          maxWidth: "100%",
        }}
      >
        <ProgressListView alignment="horizontal" progressList={progressList} />
      </div>
    </>
  );
};
// Weekly -> Monthly 전환될 때 선택된 날짜를 전달 받는다.
interface MonthlyPageProps {
  monthlyGoals: GoalType[];
  initDate?: string;
}

const MonthlyPage = ({ initDate, monthlyGoals }: MonthlyPageProps) => {
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
  const [selectedDate, setSelectedDate] = useState(dayjs()); // 미선택은 불가능하다고 이해함
  const [progressList, setProgressList] = useState(testData);

  useEffect(() => {
    // 날짜가 바뀔 때 마다 달력이 초기화된다.
    if (!!initDate) {
      setSelectedDate(dayjs(initDate));
    }
  }, [initDate]);

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

  const initDate = (context.query?.initDate ?? "") as string;
  let monthlyGoals = [] as GoalType[];

  try {
    const current = initDate ? dayjs(initDate) : dayjs();
    monthlyGoals = await getGoals(current.year(), current.month() + 1);
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      initDate,
      monthlyGoals,
    },
  };
};

export default MonthlyPage;
