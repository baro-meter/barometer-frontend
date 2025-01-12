import { useCalendar } from "@/hooks/useCalendar";
import CategoryLabel from "@/markup/components/CategoryLabel";
import ProgressListView from "@/markup/components/ProgressListView";
import { ProgressProps } from "@/markup/components/ProgressView";
import { GoalCategoryType, GoalTypeId } from "@/types/goal";
import dayjs from "dayjs";
import React, { createContext, useEffect, useState } from "react";

interface TodoListViewProps {
  activeTabTypeId: GoalTypeId | undefined;
  setActiveTabTypeId: React.Dispatch<
    React.SetStateAction<GoalTypeId | undefined>
  >;
  progressList: ProgressProps[];
  goalCategories: GoalCategoryType[];
}

const TodoListView = ({
  activeTabTypeId,
  setActiveTabTypeId,
  progressList,
  goalCategories,
}: TodoListViewProps) => {
  return (
    <div className="tab-area">
      <TodoListContext.Provider value={{ activeTabTypeId, setActiveTabTypeId }}>
        <CategoryLabel items={goalCategories} />
        <ProgressListView alignment="horizontal" progressList={progressList} />
      </TodoListContext.Provider>
    </div>
  );
};

interface TodoListProps {
  selectedDate: dayjs.Dayjs;
}

export default function TodoList({ selectedDate }: TodoListProps) {
  const [activeTabTypeId, setActiveTabTypeId] = useState<
    GoalTypeId | undefined
  >();

  const testData = [
    { task: "일이삼사오육칠팔", count: 5 },
    { task: "걸어서 회사가기", count: 3 },
    { task: "우유 한잔 마시기", count: 5 },
    { task: "근력 운동 하기", count: 4 },
  ];
  const [progressList, setProgressList] = useState(testData);
  const { goalCategories, goalByTypeMapper } = useCalendar(selectedDate);

  useEffect(() => {
    console.log(`${activeTabTypeId}로 바뀜`);
    if (activeTabTypeId) {
      console.log(goalByTypeMapper.get(activeTabTypeId));
    }
  }, [activeTabTypeId]);

  const viewProps = {
    activeTabTypeId,
    setActiveTabTypeId,
    progressList,
    goalCategories,
  };

  return <TodoListView {...viewProps} />;
}

interface TodoListContextType {
  activeTabTypeId: GoalTypeId | undefined;
  setActiveTabTypeId: (typeId: GoalTypeId | undefined) => void;
}

export const TodoListContext = createContext<TodoListContextType>({
  activeTabTypeId: undefined,
  setActiveTabTypeId: () => {},
});
