import { GoalStateType, GoalType } from "@/types/goal";
import { atom, selector, selectorFamily } from "recoil";
import { useDayjsToStr } from "@/hooks/useDateFormat";
import { getGoals } from "@/services/calendar/calendarService";
import dayjs from "dayjs";

/**
 * 조회가 되었던 '월'에 대한 목표 값들 캐싱
 * - ex) 8월 마지막 주 => 8, 9월 값이 조회되어 있을 것
 * - 목표 값은 거의 수정이 없기 때문에 들고 있는다.
 * - 수정이 이루어질 때만 갱신된다.
 */
export const goalState = atom<GoalStateType>({
  key: "goalState",
  default: {} as GoalStateType,
});

/**
 * 현재 선택된 날짜에 대한 목표 값
 */
export const currentGoalState = selectorFamily({
  key: "currentGoalState",
  get:
    (goalKey: string) =>
    ({ get }) => {
      const goalMapper = get(goalState);
      console.log(`${goalKey}요청 - ${goalMapper[goalKey]}`);

      return goalMapper[goalKey];
    },
  set:
    (goalKey: string) =>
    ({ set }, newValue) => {
      set(goalState, (prevState) => {
        return { ...prevState, [goalKey]: newValue as GoalType[] };
      });
    },
});