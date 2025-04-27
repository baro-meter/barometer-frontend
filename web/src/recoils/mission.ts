/**
 * [new api]
 * 주별 mission 정보를 저장하는 atom (캐싱)
 * (1) 이번주 mission 저장 관리 (미션 바뀔 때 마다 localStorage 수동 변경)
 * (2) 캘린더/리포트에서 조회 할 수 있는 데이터 저장 (최대 20개 항목 유지 LRU, 세션 단위 캐싱)
 */

import { MissionPerType, MissionType } from "@/types/mission";
import { atom, selector, selectorFamily } from "recoil";
import { currentWeeklyCalendarViewState } from "./calendar";
import dayjs from "dayjs";
import { getFormatDayjs } from "@/utils/calendarUtil";

export interface LastSavedDateForMissionState {
  lastAccessDate: string; // 마지막 접속일자
  savedMissionDate?: {
    // 저장된 미션 날짜
    year: number;
    week: number;
  };
}

/**
 * [new api]
 * misson 탭에서 가르키고 있는 날짜
 * - 저번주 데이터 있을 경우 저번주
 * - 아니면 다 이번주
 * TODO 이 값을 기반으로 mission 데이터 조회 필요
 */
export const lastSavedDateForMissionState = atom<
  LastSavedDateForMissionState | undefined
>({
  key: "lastSavedDateForMissionState",
  default: undefined,
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      // 브라우저 환경에서만 localStorage 접근
      if (typeof window !== "undefined") {
        console.log("lastSavedDateForMissionState");
        const savedDataStr = localStorage.getItem(
          "lastSavedDateForMissionState"
        );
        if (savedDataStr) {
          let savedDate: LastSavedDateForMissionState =
            JSON.parse(savedDataStr);

          setSelf(savedDate);
        } else {
          // 이번주 미션 데이터가 없는 경우
          setSelf({
            lastAccessDate: getFormatDayjs(dayjs()),
            savedMissionDate: undefined,
          });
        }

        onSet((newValue, _, isReset) => {
          console.log("isReset: ", isReset);
          if (isReset) {
            localStorage.removeItem("lastSavedDateForMissionState");
          } else if (newValue) {
            localStorage.setItem(
              "lastSavedDateForMissionState",
              JSON.stringify(newValue)
            );
          }
        });
      }
    },
  ],
});

/**
 * (1) 이번주 mission 저장 관리
 * - 여기는 api 데이터 그대로 저장
 */
export const currentMissionsState = selector<MissionPerType[]>({
  key: "currentMissionsState",
  get: ({ get }) => {
    const currentWeeklyCalendarView = get(currentWeeklyCalendarViewState);
    return currentWeeklyCalendarView?.goalsPerTypes ?? [];
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
