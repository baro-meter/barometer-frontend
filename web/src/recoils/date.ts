import dayjs from "dayjs";
import { atom } from "recoil";

/**
 * 현재 전역적으로 선택된 날짜 값
 */
export const dateState = atom<dayjs.Dayjs>({
  key: "dateState",
  default: dayjs(),
});
