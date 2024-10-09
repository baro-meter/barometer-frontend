import { GoalStateType } from "@/types/goal";
import { atom, selector } from "recoil";
import { dateState } from "./date";

/**
 * 조회가 되었던 '월'에 대한 목표 값들 캐싱
 * - ex) 8월 마지막 주 => 8, 9월 값이 조회되어 있을 것
 * - 목표 값은 거의 수정이 없기 때문에 들고 있는다.
 * - 수정이 이루어질 때만 갱신된다.
 */
export const goalState = atom<GoalStateType>({
  key: "goalState",
  default: undefined,
});

/**
 * 현재 선택된 날짜에 대한 목표 값
 */
export const currentGoalState = selector({
  key: "currentGoalState",
  get: ({ get }) => {
    const date = get(dateState);
    const goalMapper = get(goalState);
    const dateKey = `${date.year()}-${date.month()}`;

    return goalMapper[dateKey];
  },
});
