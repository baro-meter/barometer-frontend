import dayjs from "dayjs";

// TODO 제거 -> useDayjsToStr 사용
const FORMAT = "YYYY-MM-DD";
export function getFormatDayjs(dayjsObj: dayjs.Dayjs) {
  return dayjsObj.format(FORMAT);
}
