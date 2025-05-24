import { useCategory } from "@/hooks/useCategory";
import CategoryLabel from "@/markup/components/CategoryLabel";
import { selectedViewState } from "@/recoils/calendar";
import { selectedTabState } from "@/recoils/tab";
import { ReportViewType } from "@/types/calendar";
import { TabEnum } from "@/types/tab";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { useMission } from "@/hooks/useMission";
import { MissionCategoryId, MissionCategoryInfo } from "@/types/mission";
import ProgressList from "@/markup/components/ProgressListView";
import { ProgressProps } from "@/markup/components/ProgressView";

export type MissionTabAlignmentType = "horizontal" | "vertical";

interface MissionTabViewProps {
  activeTabTypeId: MissionCategoryId | undefined;
  setActiveTabTypeId: React.Dispatch<
    React.SetStateAction<MissionCategoryId | undefined>
  >;
  progressList: ProgressProps[];
  goalCategories: MissionCategoryInfo[];
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
          <ProgressList alignment={alignment} progressList={progressList} />
        )}
      </MissionTabContext.Provider>
    </div>
  );
};

interface MissionTabProps {
  alignment?: MissionTabAlignmentType;
}

export default function MissionTab({ alignment }: MissionTabProps) {
  const [activeTabTypeId, setActiveTabTypeId] = useState<
    MissionCategoryId | undefined
  >();

  // TODO calendar monthly 타입일 때는 goalCategories가 모두 표시되어야 함.....
  const { getAllCategoryLableItems: allCategories } = useCategory();
  const { allMissions, missionsByTypeId, missionCategories } = useMission();
  const selectedTab = useRecoilValue(selectedTabState);
  const selectedViewType = useRecoilValue(selectedViewState);

  const showCategories = useMemo(() => {
    if (
      selectedTab === TabEnum.REPORT &&
      selectedViewType === ReportViewType.MONTHLY
    ) {
      return allCategories();
    } else {
      return missionCategories;
    }
  }, [selectedTab, selectedViewType]);

  const progressList = useMemo(() => {
    const list =
      activeTabTypeId !== undefined
        ? missionsByTypeId.get(activeTabTypeId)
        : allMissions;

    return (
      list?.map((mission) => {
        const checkedList = Array(7).fill(false);
        mission.archivedDaysOfWeek.forEach((i) => (checkedList[i] = true));

        return {
          task: mission.name,
          count: mission.count,
          checkedList,
          onclick: () => console.log(`${mission.name} 클릭됨`),
          isDone: false,
        } as ProgressProps;
      }) ?? []
    );
  }, [activeTabTypeId, missionsByTypeId, allMissions]);

  const isShowList = useMemo(() => {
    return !(
      selectedTab === TabEnum.REPORT &&
      selectedViewType === ReportViewType.MONTHLY
    );
  }, [selectedViewType]);

  const viewProps = {
    activeTabTypeId,
    progressList,
    goalCategories: showCategories,
    alignment,
    isShowList,
    setActiveTabTypeId,
  };

  return <MissionTabView {...viewProps} />;
}

interface MissionTabContextType {
  activeTabTypeId: MissionCategoryId | undefined;
  setActiveTabTypeId: (typeId: MissionCategoryId | undefined) => void;
}

export const MissionTabContext = createContext<MissionTabContextType>({
  activeTabTypeId: undefined,
  setActiveTabTypeId: () => {},
});
