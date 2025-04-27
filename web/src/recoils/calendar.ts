import { getWeeklyCalendarView } from "@/services/calendar/calendarService";
import { ReportViewType, WeeklyCalendarViewType } from "@/types/calendar";
import dayjs from "dayjs";
import { atom, selector } from "recoil";
import { v1 } from "uuid";
import { lastSavedDateForMissionState } from "./mission";

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
export const currentWeeklyCalendarViewState = selector<
  WeeklyCalendarViewType | undefined
>({
  key: "currentWeeklyCalendarViewState",
  get: ({ get }) => {
    // 브라우저 환경에서만 localStorage 접근
    if (typeof window !== "undefined") {
      // 초기 로드 시 API 호출
      const loadInitialData = async (year: number, week: number) => {
        console.log("loadInitialData: ", year, week);
        try {
          return await getWeeklyCalendarView(year, week);
        } catch (error) {
          console.log("Failed to load weekly calendar data:", error);
          return undefined;
        }
      };

      const lastSavedDate = get(lastSavedDateForMissionState);
      const savedData = localStorage.getItem("currentWeeklyCalendarViewState");
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
// export const currentWeeklyCalendarViewState = atom<
//   WeeklyCalendarViewType | undefined
// >({
//   key: "currentWeeklyCalendarViewState",
//   default: undefined,
//   effects_UNSTABLE: [
//     ({ setSelf, onSet }) => {
//       // 초기 로드 시 API 호출
//       const loadInitialData = async (year: number, week: number) => {
//         try {
//           const data = await getWeeklyCalendarView(year, week);
//           setSelf(data);
//         } catch (error) {
//           console.log("Failed to load weekly calendar data:", error);
//           setSelf(undefined);
//         }
//       };

//       // localStorage에서 데이터 확인
//       const lastSavedDateStr = localStorage.getItem(
//         "lastSavedDateForMissionState"
//       ); // TODO 여기 lastSavedDateForMissionState 설정 제대로 갱신된 값 들어오는지 확인 필요, 안되면 api 호출 부분 화면 단에서 해야할듯?
//       const savedData = localStorage.getItem("currentWeeklyCalendarViewState");
//       if (savedData) {
//         setSelf(JSON.parse(savedData));
//       } else if (lastSavedDateStr) {
//         const lastSavedDate = JSON.parse(lastSavedDateStr);
//         if (lastSavedDate.savedMissionDate) {
//           // 저번주 or 이번주 설정된 미션 데이터 불러옴
//           const { year, week } = lastSavedDate.savedMissionDate;
//           loadInitialData(year, week);
//         } else {
//           // 이번주 미션 데이터 아직 미설정됨
//           setSelf(undefined);
//         }
//       } else {
//         setSelf(undefined);
//       }

//       // 데이터 변경 시 localStorage에 저장
//       onSet((newValue, _, isReset) => {
//         if (isReset) {
//           localStorage.removeItem("currentWeeklyCalendarViewState");
//         } else if (newValue) {
//           localStorage.setItem(
//             "currentWeeklyCalendarViewState",
//             JSON.stringify(newValue)
//           );
//         }
//       });
//     },
//   ],
// });
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
    return currentWeeklyCalendarView?.dayOfWeekCount ?? [0, 0, 0, 0, 0, 0, 0];
  },
});
