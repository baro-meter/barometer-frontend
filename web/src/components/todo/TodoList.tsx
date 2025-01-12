import { useCalendar } from "@/hooks/useCalendar";
import CategoryLabel from "@/markup/components/CategoryLabel";
import ProgressListView from "@/markup/components/ProgressListView";
import { ProgressProps } from "@/markup/components/ProgressView";
import { GoalCategoryType, GoalTypeId } from "@/types/goal";
import dayjs from "dayjs";
import React, { createContext, useEffect, useMemo, useState } from "react";

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
  }, [activeTabTypeId]);

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
