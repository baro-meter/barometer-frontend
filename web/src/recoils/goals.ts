import { GoalStateType, GoalType } from "@/types/goal";
import { useEffect, useState } from "react";
import { atom, selectorFamily, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
const defaultValue = {} as GoalStateType;

/**
 * 조회가 되었던 '월'에 대한 목표 값들 캐싱
 * - ex) 8월 마지막 주 => 8, 9월 값이 조회되어 있을 것
 * - 목표 값은 거의 수정이 없기 때문에 들고 있는다.
 * - 수정이 이루어질 때만 갱신된다.
 */
export const goalState = atom<GoalStateType>({
  key: "goalState",
  default: defaultValue,
  effects_UNSTABLE: [persistAtom],
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

/**
 * for ssr
 * https://github.com/polemius/recoil-persist#server-side-rendering
 */
export function useGoalState() {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(goalState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultValue : value, setValue] as const;
}
