/**
 * [new api]
 * 주별 BaroMeter 정보를 저장하는 atom (일주일 단위로 캐싱 관리되었으면 좋겠음)
 * (1) 이번주 BaroMeter
 * (2) 캘린더 Weekly 바로미터 (최대 20개 항목 유지 LRU, 세션 단위 캐싱)
 * (3) 바로미터 리스트 (최대 20개 항목 유지 LRU, 세션 단위 캐싱)
 */

import { BaroMeterType } from "@/types/barometerType";
import { selector } from "recoil";
import { currentWeeklyCalendarViewState } from "./calendar";

// (1) 이번주 BaroMeter
export const currentBarometerState = selector<BaroMeterType | undefined>({
  key: "currentBarometerState",
  get: ({ get }) => {
    const currentWeeklyCalendarView = get(currentWeeklyCalendarViewState);
    return currentWeeklyCalendarView.report;
  },
});
