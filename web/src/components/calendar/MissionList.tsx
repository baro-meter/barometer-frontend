import dayjs from "dayjs";
import React, { useMemo } from "react";
import TodoList, { TodoListAlignmentType } from "../todo/TodoList";
import Button from "@/markup/components/ButtonView";
import { useRecoilValue } from "recoil";
import { currentReportState } from "@/recoils/reports";
import { ReportType } from "@/types/calendar";
import BaroMeterReport from "../report/BaroMeterReport";
import { useCalendar } from "@/hooks/useCalendar";

interface MissionListViewProps {
  selectedDate: dayjs.Dayjs;
  missionTexts: string[];
  typeFull: boolean;
  alignment: TodoListAlignmentType;
  report?: ReportType;
}

const MissionListView = ({
  selectedDate,
  missionTexts,
  typeFull,
  alignment,
  report,
}: MissionListViewProps) => {
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
              typeFull={typeFull}
            />
          ) : (
            <TodoList selectedDate={selectedDate} alignment={alignment} />
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

interface MissionListPageProps {
  type: "weekly" | "monthly";
  year: number;
  month: number;
  date: number;
}

export default function MissionList({
  type,
  year,
  month,
  date,
}: MissionListPageProps) {
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
    const result = report?.archivedGoalIds.map(
      (id) => goalByIdMapper.get(id)?.title
    );
    return result !== undefined && result?.length > 0
      ? (result as string[])
      : [];
  }, [report, goalByIdMapper]);

  const viewProps = {
    selectedDate,
    report,
    typeFull: type === "weekly",
    alignment: (type === "weekly"
      ? "vertical"
      : "horizontal") as TodoListAlignmentType,
    missionTexts,
  };

  return <MissionListView {...viewProps} />;
}
