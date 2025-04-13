import { ReportType } from "@/types/calendar";
import dayjs from "dayjs";
import { atom, selector, selectorFamily } from "recoil";
import { v1 } from "uuid";

/**
 * monthly, weekly view에서 view/calendar api를 호출하여 가져온 reports 정보를
 * 캘린더에 그려주기 위한 컴포넌트 간 데이터 호출을 위해 사용
 */
export const reportState = atom<ReportType[]>({
  key: `reportState/${v1}`,
  default: [],
});

// arrMap을 캐싱하는 selector
/**
 * baroMeterDate에서 참조 가능하도록 date기준으로 key 값을 관리합니다.
 * weekly, monthly에서 date는 겹치는 일이 없음
 */
const reportMapState = selector({
  key: `reportMapState/${v1}`,
  get: ({ get }) => {
    // TODO 주단위로 바뀌면서 데이터 변경 필요
    const reports = get(reportState);
    return reports.reduce((map, obj) => {
      const date = dayjs(obj.date).date();
      map.set(date, obj);
      return map;
    }, new Map<number, ReportType>());
  },
});

/**
 * 날짜별 view/calendar info
 */
export const currentReportState = selectorFamily({
  key: `currentReportState/${v1}`,
  get:
    (date: number) =>
    ({ get }) => {
      const reportMap = get(reportMapState);
      return reportMap.get(date);
    },
});
