import dayjs from "dayjs";
import React, { useMemo } from "react";
import TodoList from "../todo/TodoList";

interface WeeklyListViewProps {
  selectedDate: dayjs.Dayjs;
}

const WeeklyListView = ({ selectedDate }: WeeklyListViewProps) => {
  return (
    <>
      <div
        style={{
          padding: "20px",
          position: "fixed",
          right: 0,
          left: 0,
          bottom: 0,
          top: "155.5px",
        }}
      >
        <TodoList selectedDate={selectedDate} />
        <button
          style={{
            position: "fixed",
            background: "black",
            color: "white",
            padding: "10px",
            left: "50%",
            transform: "translate(-50%, 0)",
            bottom: "30px",
          }}
        >
          오늘의 바로미터 작성
        </button>
      </div>
    </>
  );
};

interface WeeklyListPageProps {
  year: number;
  month: number;
  date: number;
}

export default function WeeklyList({ year, month, date }: WeeklyListPageProps) {
  const selectedDate = useMemo(
    () => dayjs().year(year).month(month).date(date),
    [year, month, date]
  );

  const viewProps = { selectedDate };

  return <WeeklyListView {...viewProps} />;
}
