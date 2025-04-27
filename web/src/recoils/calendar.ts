import { ReportViewType, WeeklyCalendarViewType } from "@/types/calendar";
import dayjs from "dayjs";
import { atom, selector } from "recoil";
import { v1 } from "uuid";

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
 * [new api]
 * 이번주 Misson 관리 데이터 총괄
 * - localStorage 에 저장되어 관리
 * - 여기서 각각 파생되어 관리되어짐
 */
export const currentWeeklyCalendarViewState = atom<WeeklyCalendarViewType>({
  key: "currentWeeklyCalendarViewState",
  default: {
    dayOfWeekCount: [0, 0, 0, 0, 0, 0, 0],
    goalsPerTypes: [],
    report: undefined,
  },
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      onSet((newValue) => {
        // TODO 기기 데이터로 업뎃 필요하면 수정 필요
        const savedData = localStorage.getItem(
          "currentWeeklyCalendarViewState"
        );
        if (savedData) {
          setSelf(JSON.parse(savedData));
        }

        onSet((newValue, _, isReset) => {
          isReset
            ? sessionStorage.removeItem("currentWeeklyCalendarViewState")
            : sessionStorage.setItem(
                "currentWeeklyCalendarViewState",
                JSON.stringify(newValue)
              );
        });
      });
    },
  ],
});
/**
 * [new api]
 * 주별 dayOfWeekCount 정보를 저장하는 atom (weeklyCalendar 아이콘 및 개수 표시 데이터)
 * (1) 이번주 Mission 달성 현황
 * (2) 캘린더 Weekly 주별 달성 현황
 */

// (1) 이번주 Mission 달성 현황
export const currentDayOfWeekCountState = selector<number[]>({
  key: "currentDayOfWeekCountState",
  get: ({ get }) => {
    const currentWeeklyCalendarView = get(currentWeeklyCalendarViewState);
    return currentWeeklyCalendarView.dayOfWeekCount;
  },
});
