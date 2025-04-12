import { ReportViewType } from "@/types/calendar";
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
