import { useCurrentGoalState, useGoalState } from "@/recoils/goals";
import { useEffect, useMemo, useState } from "react";
import { useDayjsToStr } from "./useDateFormat";
import dayjs from "dayjs";
import { getGoals } from "@/services/calendar/calendarService";
import { reportState } from "@/recoils/reports";
import { useSetRecoilState } from "recoil";
import { ReportType, WeeklyCalendarViewType } from "@/types/calendar";
import { GoalType, GoalTypeId } from "@/types/goal";
import { useCategory } from "./useCategory";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);
/**
 * 04.05 change
 * calendar View에서 공통적으로 동작하는 로직을 설정
 * - 선택된 날짜에 따라 goalKey를 자동으로 가져와서 목표 값들을 조회할 수 있음
 * - 선택된 주가 바뀌고, recoil에 저장된 goals이 없을 때 => fetch (`/goals`)
 * - TODO 년도 바뀌는 주 테스트 필요
 */
export const useCalendar = (currentDate: dayjs.Dayjs) => {
  const goalKey = useMemo(() => {
    return `${currentDate.year()}/${currentDate.week()}`;
  }, [currentDate]);
  const [currentGoal, setCurrentGoal] = useCurrentGoalState(goalKey);

  const setCalendarViewData = useSetRecoilState(reportState);
  const { getCategoryInfo } = useCategory();

  useEffect(() => {
    const fetchGoal = async () => {
      const newGoals = await getGoals(currentDate.year(), currentDate.week());
      setCurrentGoal(newGoals);
    };

    if (!currentGoal) {
      fetchGoal();
    }
  }, [currentGoal, currentDate]);

  const goalByIdMapper = useMemo(() => {
    if (!currentGoal) {
      return new Map<number, GoalType>();
    }

    return currentGoal.reduce((map, obj) => {
      const { monthlyGoalId } = obj;
      map.set(monthlyGoalId, obj);
      return map;
    }, new Map<GoalTypeId, GoalType>());
  }, [currentGoal]);

  const goalByTypeMapper = useMemo(() => {
    if (!currentGoal) {
      return new Map<GoalTypeId, GoalType[]>();
    }

    return currentGoal.reduce((map, obj) => {
      const { typeId } = obj;
      map.set(typeId, [...(map.get(typeId) ?? []), obj]);
      return map;
    }, new Map<GoalTypeId, GoalType[]>());
  }, [currentGoal]);

  const goalCategories = useMemo(() => {
    return [
      { text: "전체", order: 0 },
      ...Array.from(goalByTypeMapper.keys())
        .map((typeId) => getCategoryInfo(Number(typeId)))
        .filter((item) => !!item),
    ];
  }, [goalByTypeMapper]);

  // TODO 삭제
  const initBaromters = (reports: ReportType[]) => {
    setCalendarViewData(reports);
  };

  return {
    currentGoal,
    goalByIdMapper, // goalId 별 goal mapper
    goalByTypeMapper, // goalCategoryTypeId 별 goals 목록 mapper
    goalCategories, // 설정된 목표의 goal category 목록 - TODO 04.05 week단위로 관리 필요
    initBaromters,
  };
};
