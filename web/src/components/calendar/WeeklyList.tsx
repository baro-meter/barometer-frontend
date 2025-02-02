import dayjs from "dayjs";
import React, { useEffect, useMemo } from "react";
import TodoList from "../todo/TodoList";
import Button from "@/markup/components/ButtonView";
import { useRecoilValue } from "recoil";
import { currentReportState } from "@/recoils/reports";
import { ReportType } from "@/types/calendar";
import BaroMeterReport from "../report/BaroMeterReport";
import { useCalendar } from "@/hooks/useCalendar";

interface WeeklyListViewProps {
  selectedDate: dayjs.Dayjs;
  missionTexts: string[];
  report?: ReportType;
}

const WeeklyListView = ({
  selectedDate,
  missionTexts,
  report,
}: WeeklyListViewProps) => {
  const hasReport = useMemo(() => report !== undefined, [report]);
  return (
    <>
      <div className="bottom-area">
        <div className="inner">
          {hasReport ? (
            <BaroMeterReport
              report={report!}
              selectedDate={selectedDate}
              missionTexts={missionTexts}
            />
          ) : (
            <TodoList selectedDate={selectedDate} alignment="vertical" />
          )}
        </div>
      </div>
      {!hasReport && (
        <div className="fixed-area">
          <Button as="a" href="/" label="오늘의 바로미터 작성" />
        </div>
      )}
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
    () =>
      dayjs()
        .year(year)
        .month(month - 1)
        .date(date),
    [year, month, date]
  );

  const { goalByIdMapper } = useCalendar(selectedDate);
  const report = useRecoilValue(currentReportState(date));

  const missionTexts = useMemo(() => {
    console.log(goalByIdMapper);
    console.log(report?.archivedGoalIds);
    const result = report?.archivedGoalIds.map(
      (id) => goalByIdMapper.get(id)?.title
    );
    return result !== undefined && result?.length > 0
      ? (result as string[])
      : [];
  }, [report, goalByIdMapper]);

  const viewProps = { selectedDate, report, missionTexts };

  return <WeeklyListView {...viewProps} />;
}
