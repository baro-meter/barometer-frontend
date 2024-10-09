import dayjs from "dayjs";

export const useDayjsToStr = () => {
  const FORMAT = "YYYY-MM-DD";
  const getFormatDayjs = (dayjsObj: dayjs.Dayjs) => {
    return dayjsObj.format(FORMAT);
  };

  const GOAL_STATE_KEY_FORMAT = "YYYY-MM";
  const getGoalStateKey = (dayjsObj: dayjs.Dayjs) => {
    return dayjsObj.format(GOAL_STATE_KEY_FORMAT);
  };

  return {
    getFormatDayjs,
    getGoalStateKey,
  };
};
