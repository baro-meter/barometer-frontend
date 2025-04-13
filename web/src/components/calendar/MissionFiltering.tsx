import dayjs from "dayjs";
import React, { useMemo } from "react";
import MissionTab, { MissionTabAlignmentType } from "../todo/MissionTab";
import Button from "@/markup/components/ButtonView";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentReportState } from "@/recoils/reports";
import { ReportType, ReportViewType } from "@/types/calendar";
import { useCalendar } from "@/hooks/useCalendar";
import { selectedDayjsState, selectedViewState } from "@/recoils/calendar";

interface MissionFilteringViewProps {
  selectedDate: dayjs.Dayjs;
  missionTexts: string[];
  typeFull: boolean;
  alignment: MissionTabAlignmentType;
  isShowBaroMeterBtn: boolean;
  report?: ReportType;
}

const MissionFilteringView = ({
  selectedDate,
  missionTexts,
  typeFull,
  alignment,
  isShowBaroMeterBtn,
  report,
}: MissionFilteringViewProps) => {
  const hasReport = useMemo(() => report !== undefined, [report]);
  return (
    <>
      <div className="bottom-area">
        <div className="inner">
          <div className="tab-area">
            <MissionTab selectedDate={selectedDate} alignment={alignment} />
            {/* {hasReport ? (
            <BaroMeterReport
              report={report!}
              selectedDate={selectedDate}
              missionTexts={missionTexts}
              typeFull={typeFull}
            />
          ) : (
            <TodoList selectedDate={selectedDate} alignment={alignment} />
          )} */}
          </div>
        </div>
      </div>
      {isShowBaroMeterBtn && (
        <div className="fixed-area">
          <Button as="a" href="/" label="바로미터 채우기 ✏️" />
        </div>
      )}
    </>
  );
};

interface MissionFilteringPageProps {
  type: "weekly" | "monthly";
}

export default function MissionFiltering({ type }: MissionFilteringPageProps) {
  const selectedViewType = useRecoilValue(selectedViewState);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDayjsState);

  const { goalByIdMapper } = useCalendar(selectedDate);
  const report = useRecoilValue(currentReportState);

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
      : "horizontal") as MissionTabAlignmentType,
    missionTexts,
    isShowBaroMeterBtn: selectedViewType === ReportViewType.WEEKLY,
  };

  return <MissionFilteringView {...viewProps} />;
}
