import React, { useMemo } from "react";
import MissionTab, { MissionTabAlignmentType } from "../todo/MissionTab";
import Button from "@/markup/components/ButtonView";
import { useRecoilValue } from "recoil";
import { currentReportState } from "@/recoils/reports";
import { ReportType } from "@/types/calendar";
import { useWeeklyCalendar } from "@/hooks/useWeeklyCalendar";
import { selectedTabState } from "@/recoils/tab";
import { TabEnum } from "@/types/tab";

interface BaroMeterButtonType {
  text: string;
  url: string;
}

interface MissionFilteringViewProps {
  alignment: MissionTabAlignmentType;
  baroMeterButton?: BaroMeterButtonType;
  report?: ReportType;
}

const MissionFilteringView = ({
  alignment,
  baroMeterButton,
  report,
}: MissionFilteringViewProps) => {
  const hasReport = useMemo(() => report !== undefined, [report]);
  return (
    <>
      <div className="bottom-area">
        <div className="inner">
          <div className="tab-area">
            <MissionTab alignment={alignment} />
          </div>
        </div>
      </div>
      {!!baroMeterButton && (
        <div className="fixed-area">
          <Button
            as="a"
            href={baroMeterButton.url}
            label={baroMeterButton.text}
          />
        </div>
      )}
    </>
  );
};

interface MissionFilteringPageProps {
  type: "weekly" | "monthly";
}

export default function MissionFiltering({ type }: MissionFilteringPageProps) {
  const { barometer } = useWeeklyCalendar();
  const selectedViewType = useRecoilValue(selectedTabState);
  // const [selectedDate, setSelectedDate] = useRecoilState(selectedDayjsState);

  // const { goalByIdMapper } = useGoal(selectedDate);
  const report = useRecoilValue(currentReportState);

  // const missionTexts = useMemo(() => {
  //   const result = report?.archivedGoalIds.map(
  //     (id) => goalByIdMapper.get(id)?.title
  //   );
  //   return result !== undefined && result?.length > 0
  //     ? (result as string[])
  //     : [];
  // }, [report, goalByIdMapper]);

  const baroMeterButton = useMemo(() => {
    if (!!barometer) {
      return {
        text: "작성한 바로미터 보기 👀",
        url: "/barometer", // TODO 바로미터 조회 화면 넘어가기
      };
    } else {
      if (selectedViewType === TabEnum.MISSION) {
        if (!barometer) {
          return {
            text: "바로미터 채우기",
            url: "/barometer", // TODO 바로미터 작성 화면 넘어가기
          };
        }
      }
    }
    return undefined;
  }, [selectedViewType, barometer]);

  const viewProps = {
    alignment: (type === "weekly"
      ? "vertical"
      : "horizontal") as MissionTabAlignmentType,
    baroMeterButton,
    report,
  };

  return <MissionFilteringView {...viewProps} />;
}
