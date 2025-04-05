import dayjs from "dayjs";

export const useDayjsToStr = () => {
  const FORMAT = "YYYY-MM-DD";
  const getFormatDayjs = (dayjsObj: dayjs.Dayjs) => {
    return dayjsObj.format(FORMAT);
  };

  return {
    getFormatDayjs,
  };
};
