import MonthlyCalendar from "@/components/Calendar/MonthlyCalendar";
import dayjs from "dayjs";
import MonthlyHeaderView from "markup/components/Calendar/MonthlyHeaderView";
import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";

interface MonthlyPageViewProps {
  year: number;
  month: number;
  date: number;
  handleArrowClicked: (type: "next" | "prev") => void;
}

const MonthlyPageView = ({
  year,
  month,
  date,
  handleArrowClicked,
}: MonthlyPageViewProps) => {
  return (
    <>
      <MonthlyHeaderView
        year={year}
        month={month}
        handleArrowClicked={handleArrowClicked}
      />
      <MonthlyCalendar year={year} month={month} date={date} />
    </>
  );
};
// Weekly -> Monthly 전환될 때 선택된 날짜를 전달 받는다.
interface MonthlyPageProps {
  initDate?: number; // milliseconds
}

const MonthlyPage = ({ initDate }: MonthlyPageProps) => {
  // TODO 기획 측에 달력 인터랙션이 내가 이해한 것과 동일한지 확인 필요
  const [selectedDate, setSelectedDate] = useState(dayjs()); // 미선택은 불가능하다고 이해함

  useEffect(() => {
    // 날짜가 바뀔 때 마다 달력이 초기화된다.
    console.log(`initDate: ${initDate}`);
    if (!!initDate) {
      setSelectedDate(dayjs(initDate));
    }
  }, [initDate]);

  const handleArrowClicked = (type: "next" | "prev") => {
    let changedDate = selectedDate;
    if (type === "next") {
      changedDate = changedDate.add(1, "month").set("date", 1);
    } else {
      changedDate = changedDate.subtract(1, "month").set("date", 1);
    }
    console.log(changedDate.week());
    setSelectedDate(changedDate);
  };

  const viewProps = {
    year: selectedDate.year(),
    month: selectedDate.month() + 1, // 월은 0부터 시작
    date: selectedDate.date(),
    handleArrowClicked,
  };

  return <MonthlyPageView {...viewProps} />;
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const initDate = context.query?.initDate ?? "";
  return {
    props: {
      initDate,
    },
  };
};

export default MonthlyPage;
