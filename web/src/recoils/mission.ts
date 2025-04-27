/**
 * [new api]
 * 주별 mission 정보를 저장하는 atom (캐싱)
 * (1) 이번주 mission 저장 관리 (미션 바뀔 때 마다 localStorage 수동 변경)
 * (2) 캘린더/리포트에서 조회 할 수 있는 데이터 저장 (최대 20개 항목 유지 LRU, 세션 단위 캐싱)
 */

import { MissionPerType, MissionType } from "@/types/mission";
import { selector, selectorFamily } from "recoil";
import { currentWeeklyCalendarViewState } from "./calendar";

/**
 * (1) 이번주 mission 저장 관리
 * - 여기는 api 데이터 그대로 저장
 */
export const currentMissionsState = selector<MissionPerType[]>({
  key: "currentMissionsState",
  get: ({ get }) => {
    const currentWeeklyCalendarView = get(currentWeeklyCalendarViewState);
    return currentWeeklyCalendarView.goalsPerTypes;
  },
});

// currentMissionState 에서 특정 카테고리 데이터 조회
export const currentMissionByCategoryMapState = selector({
  key: "currentMissionByCategoryMapState",
  get: ({ get }) => {
    const currentMissions = get(currentMissionsState);
    const map = currentMissions.reduce((map, obj) => {
      map.set(obj.type, obj.goals);
      return map;
    }, new Map<number, MissionType[]>());
    return map;
  },
  cachePolicy_UNSTABLE: {
    eviction: "keep-all",
  },
});

// currentMissionByCategoryMapState 에서 특정 카테고리 데이터 조회
export const currentMissionByCategoryState = selectorFamily({
  key: "currentMissionByCategoryState",
  get:
    (categoryId: number) =>
    ({ get }) => {
      const map = get(currentMissionByCategoryMapState);
      return map.get(categoryId);
    },
});
