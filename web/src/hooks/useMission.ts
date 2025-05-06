import { useCurrentGoalState } from "@/recoils/goals";
import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { getGoals } from "@/services/calendar/calendarService";
import { reportState } from "@/recoils/reports";
import { useSetRecoilState } from "recoil";
import { ReportType } from "@/types/calendar";
import { GoalTypeId } from "@/types/goal";
import { useCategory } from "./useCategory";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { GoalMissionType } from "@/types/mission";

dayjs.extend(weekOfYear);
/**
 * 04.05 change
 * calendar View에서 공통적으로 동작하는 로직을 설정
 * - 선택된 날짜에 따라 goalKey를 자동으로 가져와서 목표 값들을 조회할 수 있음
 * - 선택된 주가 바뀌고, recoil에 저장된 goals이 없을 때 => fetch (`/goals`)
 * - TODO 년도 바뀌는 주 테스트 필요
 */
export const useMission = (currentDate: dayjs.Dayjs) => {
  const missionKey = useMemo(() => {
    return `${currentDate.year()}/${currentDate.week()}`;
  }, [currentDate]);
  const [currentGoal, setCurrentGoal] = useCurrentGoalState(missionKey);

  const setCalendarViewData = useSetRecoilState(reportState);
  const { getCategoryInfo } = useCategory();

  useEffect(() => {
    /**
     * TODO prefetch한거 가져오는걸로 변경 필요
     * https://velog.io/@day_1226/Next.js-tanstack-query%EB%A1%9C-prefetch-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
     */
    const fetchGoal = async () => {
      console.log("fetchGoal");
      const newGoals = await getGoals(currentDate.year(), currentDate.week());
      setCurrentGoal(newGoals);
    };

    if (!currentGoal) {
      fetchGoal();
    }
  }, [currentGoal, currentDate]);

  const goalByIdMapper = useMemo(() => {
    if (!currentGoal) {
      console.log("goalByIdMapper 없음");
      return new Map<number, GoalMissionType>();
    }

    console.log("goalByIdMapper 있음");
    return currentGoal.reduce((map, obj) => {
      const { go } = obj;
      map.set(monthlyGoalId, obj);
      return map;
    }, new Map<GoalTypeId, GoalMissionType>());
  }, [currentGoal]);

  const goalByTypeMapper = useMemo(() => {
    if (!currentGoal) {
      return new Map<GoalTypeId, GoalMissionType[]>();
    }

    return currentGoal.reduce((map, obj) => {
      const { typeId } = obj;
      map.set(typeId, [...(map.get(typeId) ?? []), obj]);
      return map;
    }, new Map<GoalTypeId, GoalMissionType[]>());
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
