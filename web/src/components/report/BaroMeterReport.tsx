import SubTab from "@/markup/components/SubTab";
import React, { useMemo } from "react";
import MissionSummary from "@/markup/components/SummaryView";
import { ReportType } from "@/types/calendar";
import dayjs from "dayjs";
import { getDayText } from "@/utils/calendarUtil";

interface BaroMeterReportViewProps {
  report: ReportType;
  subTabTitle: string;
  missionTexts: string[];
}

const BaroMeterReportView = ({
  report,
  subTabTitle,
  missionTexts,
}: BaroMeterReportViewProps) => (
  <>
    <SubTab title={subTabTitle} />
    <div className="mission-area">
      <MissionSummary
        text={report.message ?? ""}
        typeFull
        imgSrc="https://images.unsplash.com/photo-1591258370814-01609b341790?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        missionTexts={missionTexts}
        score={report.score}
      />
    </div>
  </>
);

interface BaroMeterReportProps {
  report: ReportType;
  selectedDate: dayjs.Dayjs;
  missionTexts: string[];
}

export default function BaroMeterReport({
  report,
  selectedDate,
  missionTexts,
}: BaroMeterReportProps) {
  const subTabTitle = useMemo(() => {
    const title = selectedDate.isSame(dayjs(), "day")
      ? "TODAY"
      : getDayText(selectedDate);
    return `${selectedDate.date()}. ${title}`;
  }, [selectedDate]);

  const viewProps = { report, subTabTitle, missionTexts };

  return <BaroMeterReportView {...viewProps} />;
}
