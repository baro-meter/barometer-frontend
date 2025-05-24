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
 * - 이 값이 없으면 미션 탭에서 데이터 조회 후 저장함
 * - localStorage에 저장하여 관리할지 고민 중
 */
export const missionWeeklyCalendarViewState = atom<
  WeeklyCalendarViewType | undefined
>({
  key: `missionWeeklyCalendarViewState/${v1}`,
  default: undefined,
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
  cachePolicy_UNSTABLE: {
    eviction: "keep-all",
  },
});
