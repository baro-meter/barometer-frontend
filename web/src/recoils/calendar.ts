import { getWeeklyCalendarView } from "@/services/calendar/calendarService";
import { ReportViewType, WeeklyCalendarViewType } from "@/types/calendar";
import dayjs from "dayjs";
import { atom, selector, selectorFamily } from "recoil";
import { v1 } from "uuid";
import { lastSavedDateForMissionState } from "./mission";
import { accessTokenState } from "./user";

const defaultValue = dayjs();

/**
 * TODO
 * 캘린더 -> 이름 변경 /report에서 쓰고 있음
 */

/**
 * 선택된 날짜
 * - 이 값을 기반으로 캘린더가 표시된다.
 */
export const selectedDayjsState = atom<dayjs.Dayjs>({
  key: `selectedDate/${v1}`,
  default: defaultValue,
});

export const selectedDateState = selector({
  key: "selectedDateSelector",
  get: ({ get }) => get(selectedDayjsState).date(),
});

/**
 * Tab2에서 아래 view 중 하나의 값 가르킴
 * - monthly, weekly, list
 */
export const selectedViewState = atom<ReportViewType>({
  key: `selectedViewType/${v1}`,
  default: ReportViewType.MONTHLY,
});

/**
 * [new api] 1탭
 * 이번주 Misson 관리 데이터 총괄
 * - localStorage 에 저장되어 관리
 * - 여기서 각각 파생되어 관리되어짐
 */
export const missionWeeklyCalendarViewState = selector<
  WeeklyCalendarViewType | undefined
>({
  key: "missiontWeeklyCalendarViewState",
  get: ({ get }) => {
    // 브라우저 환경에서만 localStorage 접근
    if (typeof window !== "undefined") {
      // 초기 로드 시 API 호출
      const accessTokenStr = get(accessTokenState);
      /**
       * TODO mission page에서 prefetch 한번만 하고 캐싱된 query 호출하도록 변경
       * https://velog.io/@day_1226/Next.js-tanstack-query%EB%A1%9C-prefetch-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
       */
      const loadInitialData = async (year: number, week: number) => {
        console.log("loadInitialData: ", year, week);
        try {
          return await getWeeklyCalendarView(year, week, {
            Authorization: accessTokenStr ?? "",
          });
        } catch (error) {
          console.log("Failed to load weekly calendar data:", error);
          return undefined;
        }
      };

      const lastSavedDate = get(lastSavedDateForMissionState);
      const savedData = localStorage.getItem("missionWeeklyCalendarViewState");
      if (savedData) {
        return JSON.parse(savedData);
      } else if (lastSavedDate) {
        console.log("lastSavedDate: ", lastSavedDate);
        if (lastSavedDate.savedMissionDate) {
          // 저번주 or 이번주 설정된 미션 데이터 불러옴
          const { year, week } = lastSavedDate.savedMissionDate;
          return loadInitialData(year, week);
        }
      }
      console.log("savedData: ", savedData);
    }
    // 이번주 미션 데이터 아직 미설정됨
    return undefined;
  },
  cachePolicy_UNSTABLE: {
    eviction: "keep-all",
  },
});

/**
 * [new api] 2탭 - weekly
 * 특정 주 weekly view 데이터 화면 단에서 호출하여 이 state에 세팅
 * 이 데이터로 여러 컴포넌트 및 hook에서 접근해서 관리할 용도
 */
export const weeklyCalendarViewState = atom<WeeklyCalendarViewType | undefined>(
  {
    key: `WeeklyCalendarViewState/${v1}`,
    default: undefined,
  }
);

/**
 * [new api]
 * 주별 dayOfWeekCount 정보를 저장하는 atom (weeklyCalendar 아이콘 및 개수 표시 데이터)
 * - 미션 여부에 따라 바라보는 state가 다르다.
 * (1) 이번주 Mission 달성 현황
 * (2) 캘린더 Weekly 주별 달성 현황
 */

export const dayOfWeekCountState = selectorFamily({
  key: `dayOfWeekCountState/${v1}`,
  get:
    (isMission: boolean) =>
    ({ get }) => {
      let calendarView = isMission
        ? get(missionWeeklyCalendarViewState)
        : get(weeklyCalendarViewState);

      return calendarView?.dayOfWeekCount ?? [0, 0, 0, 0, 0, 0, 0];
    },
});
