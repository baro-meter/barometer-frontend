import { useCurrentGoalState, useGoalState } from "@/recoils/goals";
import { GoalStateType } from "@/types/goal";
import { useEffect, useState } from "react";
import { useDayjsToStr } from "./useDateFormat";
import dayjs from "dayjs";
import { getGoals } from "@/services/calendar/calendarService";
import { reportState } from "@/recoils/reports";
import { useSetRecoilState } from "recoil";
import { ReportType } from "@/types/calendar";

/**
 * TODO calendar View에서 공통적으로 동작하는 로직을 설정
 * - 월이 바뀌고, recoil에 저장된 goals이 없을 때 => fetch (`/goals`)
 */
export const useCalendar = (currentDate: dayjs.Dayjs) => {
  const { getGoalStateKey } = useDayjsToStr();

  const [goal, setGoal] = useGoalState();
  const [goalKey, setGoalKey] = useState(getGoalStateKey(currentDate));
  const [currentGoal, setCurrentGoal] = useCurrentGoalState(goalKey);
  const setCalendarViewData = useSetRecoilState(reportState);

  /**
   * calendar View 조회 시, goals 데이터 받아서 초기화
   * TODO: 굳이 serverSide에서 불러와서 초기화 안시켜도 될 것 같다.
   * => 밑에서 없을 때만 fetch해서 알아서 잘 불러오기 때문
   *
   * - 대신 weekly에서 두 달이 겹치는 경우 두개 동시 초기화가 필요할 수 있을 것 같아서 남겨둠.
   * - 일단 monthly에서는 없을 때만 호출하게 해두었음 (그래야 불필요하게 새로고침하거나 화면 바뀌어도 호출 안됨)
   * - 혹은 react-native 연동 시 로컬 데이터 초기에 받도록 설정 할 때 사용
   * @param initGoalState
   */
  // const initGoals = (initGoalState: GoalStateType) => {
  //   setGoal((beforeGoal) => {
  //     const result = { ...beforeGoal };
  //     Object.keys(initGoalState).forEach((key) => {
  //       result[key] = initGoalState[key];
  //     });
  //     return result;
  //   });
  // };

  useEffect(() => {
    const newGoalKey = getGoalStateKey(currentDate);
    if (newGoalKey !== goalKey) {
      setGoalKey(newGoalKey);
    }
  }, [currentDate]);

  useEffect(() => {
    const fetchGoal = async () => {
      const newGoals = await getGoals(
        currentDate.year(),
        currentDate.month() + 1
      );
      setCurrentGoal(newGoals);
    };

    if (!currentGoal) {
      fetchGoal();
    }
  }, [currentGoal, currentDate]);

  const initBaromters = (reports: ReportType[]) => {
    setCalendarViewData(reports);
  };

  return {
    currentGoal,
    initBaromters,
  };
};
