import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { atom, selector, useRecoilState } from "recoil";
import { v1 } from "uuid";

const defaultValue = dayjs();

/**
 * TODO 언젠간 리팩토링....
 * 선택된 날짜를 관리하는 값
 * - 컴포넌트에서 다 참조하고 있어서 recoil로 관리함.
 * persist에 저장되지 않습니다. 따라서 weekly <-> monthly 전환 시에는 query를 날려 선택되고자 하는 날짜를 전달해야 합니다.
 */
export const selectedDayjsState = atom<dayjs.Dayjs>({
  key: `selectedDate/${v1}`,
  default: defaultValue,
});

export const selectedDateState = selector({
  key: "selectedDateSelector",
  get: ({ get }) => get(selectedDayjsState).date(),
});
