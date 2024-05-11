import dayjs from "dayjs";

const FORMAT = "YYYY-MM-DD";
export function getFormatDayjs(dayjsObj: dayjs.Dayjs) {
  return dayjsObj.format(FORMAT);
}
