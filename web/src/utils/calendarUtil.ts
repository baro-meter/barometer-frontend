import dayjs from "dayjs";

// TODO 제거 -> useDayjsToStr 사용
const FORMAT = "YYYY-MM-DD";
export function getFormatDayjs(dayjsObj: dayjs.Dayjs) {
  return dayjsObj.format(FORMAT);
}

export function getWeeklyDateRange(date: dayjs.Dayjs) {
  let startDate = dayjs().year(date.year()).week(date.week()).day(0);
  let endDate = startDate.add(7, "day");

  return { startDate, endDate };
}

// day.js 기준으로 요일 3글자를 가져오는 함수
const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export function getDayText(dayjsObj: dayjs.Dayjs) {
  return DAYS[dayjsObj.day()];
}
