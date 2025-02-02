import dayjs from "dayjs";
import React, { useMemo } from "react";
import TodoList from "../todo/TodoList";
import Button from "@/markup/components/ButtonView";

interface WeeklyListViewProps {
  selectedDate: dayjs.Dayjs;
}

const WeeklyListView = ({ selectedDate }: WeeklyListViewProps) => {
  return (
    <>
      <div className="bottom-area">
        <div className="inner">
          <TodoList selectedDate={selectedDate} alignment="vertical" />
        </div>
      </div>
      <div className="fixed-area">
        <Button as="a" href="/" label="오늘의 바로미터 작성" />
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
