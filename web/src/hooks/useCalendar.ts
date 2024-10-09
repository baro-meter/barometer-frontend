import { currentGoalState, goalState } from "@/recoils/goals";
import { GoalStateType } from "@/types/goal";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDayjsToStr } from "./useDateFormat";
import dayjs from "dayjs";
import { getGoals } from "@/services/calendar/calendarService";

/**
 * TODO calendar View에서 공통적으로 동작하는 로직을 설정
 * - 월이 바뀌고, recoil에 저장된 goals이 없을 때 => fetch (`/goals`)
 */
export const useCalendar = (currentDate: dayjs.Dayjs) => {
  const { getGoalStateKey } = useDayjsToStr();

  const [goal, setGoal] = useRecoilState(goalState);
  const [goalKey, setGoalKey] = useState(getGoalStateKey(currentDate));
  //   const currentDate = useRecoilValue(currentDateState);
  const [currentGoal, setCurrentGoal] = useRecoilState(
    currentGoalState(goalKey)
  );

  // calendar View 조회 시, goals 데이터 받아서 초기화
  const initGoals = (initGoalState: GoalStateType) => {
    setGoal((beforeGoal) => {
      const result = { ...beforeGoal };
      Object.keys(initGoalState).forEach((key) => {
        result[key] = initGoalState[key];
      });
      return result;
    });
  };

  useEffect(() => {
    const newGoalKey = getGoalStateKey(currentDate);
    if (newGoalKey !== goalKey) {
      setGoalKey(newGoalKey);
    }
  }, [currentDate]);

  useEffect(() => {
    const fetchGoal = async () => {
      const newGoals = await getGoals(currentDate.year(), currentDate.month());
      setCurrentGoal(newGoals);
    };

    if (!currentGoal) {
      fetchGoal();
    }
  }, [currentGoal, currentDate]);

  return {
    initGoals,
  };
};
