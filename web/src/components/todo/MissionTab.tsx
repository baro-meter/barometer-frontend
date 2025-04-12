import { useCalendar } from "@/hooks/useCalendar";
import CategoryLabel from "@/markup/components/CategoryLabel";
import ProgressListView from "@/markup/components/ProgressListView";
import { ProgressProps } from "@/markup/components/ProgressView";
import { selectedViewState } from "@/recoils/calendar";
import { ReportViewType } from "@/types/calendar";
import { GoalCategoryType, GoalTypeId } from "@/types/goal";
import dayjs from "dayjs";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

export type MissionTabAlignmentType = "horizontal" | "vertical";

interface MissionTabViewProps {
  activeTabTypeId: GoalTypeId | undefined;
  setActiveTabTypeId: React.Dispatch<
    React.SetStateAction<GoalTypeId | undefined>
  >;
  progressList: ProgressProps[];
  goalCategories: GoalCategoryType[];
  isShowList: boolean;
  alignment?: MissionTabAlignmentType;
}

const MissionTabView = ({
  activeTabTypeId,
  progressList,
  goalCategories,
  alignment = "horizontal",
  isShowList = false,
  setActiveTabTypeId,
}: MissionTabViewProps) => {
  return (
    <div className="tab-area">
      <MissionTabContext.Provider
        value={{ activeTabTypeId, setActiveTabTypeId }}
      >
        <CategoryLabel items={goalCategories} />
        {isShowList && (
          <ProgressListView alignment={alignment} progressList={progressList} />
        )}
      </MissionTabContext.Provider>
    </div>
  );
};

interface MissionTabProps {
  selectedDate: dayjs.Dayjs;
  alignment?: MissionTabAlignmentType;
}

export default function MissionTab({
  selectedDate,
  alignment,
}: MissionTabProps) {
  const [activeTabTypeId, setActiveTabTypeId] = useState<
    GoalTypeId | undefined
  >();

  const selectedViewType = useRecoilValue(selectedViewState);

  const { currentGoal, goalCategories, goalByTypeMapper } =
    useCalendar(selectedDate);

  const progressList = useMemo(() => {
    const list = activeTabTypeId
      ? goalByTypeMapper.get(activeTabTypeId)
      : currentGoal;
    return (
      list?.map((goal) => {
        return {
          task: goal.title, // 삭제 예정
          count: goal.count, // 삭제 예정
          goal,
          onclick: () => console.log(`${goal.title} 클릭됨`),
          isDone: false,
        } as ProgressProps;
      }) ?? []
    );
  }, [activeTabTypeId, currentGoal]);

  useEffect(() => {
    console.log(`${activeTabTypeId}로 바뀜`);
    if (activeTabTypeId) {
      console.log(goalByTypeMapper.get(activeTabTypeId));
    }
  }, [activeTabTypeId]);

  const viewProps = {
    activeTabTypeId,
    progressList,
    goalCategories,
    alignment,
    isShowList: selectedViewType === ReportViewType.WEEKLY,
    setActiveTabTypeId,
  };

  return <MissionTabView {...viewProps} />;
}

interface MissionTabContextType {
  activeTabTypeId: GoalTypeId | undefined;
  setActiveTabTypeId: (typeId: GoalTypeId | undefined) => void;
}

export const MissionTabContext = createContext<MissionTabContextType>({
  activeTabTypeId: undefined,
  setActiveTabTypeId: () => {},
});
