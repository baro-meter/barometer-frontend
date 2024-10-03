import React, { useState } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/calendar.module.scss";
import Image from "next/image";
import { basePath } from "next.config";
import Picker from "react-mobile-picker";

interface CalendarHeaderViewProps {
  type: "monthly" | "weekly";
  year: number;
  month: number;
  isToday?: boolean;
  onToggleCalendarType: () => void;
  onClickTodayMoveBtn: () => void;
  onChangeDate: (year: number, month: number) => void;
}

const cn = classNames.bind(scss);

const CalendarHeaderView = ({
  type,
  year,
  month,
  isToday = false,
  onToggleCalendarType,
  onClickTodayMoveBtn,
  onChangeDate,
}: CalendarHeaderViewProps) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const [pickerValue, setPickerValue] = useState({
    year: year.toString(),
    month: month.toString(),
  });

  const togglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  const handlePickerChange = (value: { [key: string]: string }) => {
    if (value.year && value.month) {
      const { year, month } = value;
      setPickerValue({ year: year, month: month });
      onChangeDate(parseInt(year), parseInt(month));
    } else {
      console.error("picker doesn`t have year and month");
    }
  };

  const yearOptions = Array.from({ length: 10 }, (_, i) =>
    (year - 5 + i).toString()
  );
  const monthOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  return (
    <div className={cn("calendar-header", { "is-selected": isPickerVisible })}>
      <div className={cn("inner")}>
        <div className={cn("date-wrapper")}>
          <button type="button" className={cn("date")} onClick={togglePicker}>
            <span>{pickerValue.year}</span>.<span>{pickerValue.month}</span>
            <span className={cn("icon")}>
              <Image
                src={`${basePath}/calendar/icon-arrow-bottom.svg`}
                width={12}
                height={7}
                alt={"날짜 변경"}
              />
            </span>
          </button>
        </div>
        {type === "weekly" ? (
          <button
            className={cn("btn-calendar-view")}
            aria-label="Monthly View"
            onClick={onToggleCalendarType}
          >
            <Image
              src={`${basePath}/calendar/icon-monthly.svg`}
              width={20}
              height={20}
              alt={""}
            />
          </button>
        ) : (
          <>
            {!isToday && (
              <button
                className={cn("btn-calendar-today")}
                aria-label="Today"
                onClick={onClickTodayMoveBtn}
              >
                <Image
                  src={`${basePath}/calendar/icon-today.svg`}
                  width={20}
                  height={20}
                  alt={"오늘보기"}
                />
              </button>
            )}
            <button
              className={cn("btn-calendar-view")}
              aria-label="Weekly View"
              onClick={onToggleCalendarType}
            >
              <Image
                src={`${basePath}/calendar/icon-weekly.svg`}
                width={20}
                height={20}
                alt={"Weekly 전환"}
              />
            </button>
          </>
        )}
      </div>

      {isPickerVisible && (
        <div className={cn("picker-container")}>
          <Picker
            value={pickerValue}
            onChange={handlePickerChange}
            wheelMode="natural"
            height={108}
            itemHeight={36}
            className={cn("picker-inner")}
          >
            <Picker.Column key="year" name="year" className={cn("picker-year")}>
              {yearOptions.map((option) => (
                <Picker.Item key={option} value={option}>
                  {({ selected }) => (
                    <div className={selected ? cn("selected-item") : ""}>
                      {option}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column
              key="month"
              name="month"
              className={cn("picker-month")}
            >
              {monthOptions.map((option) => (
                <Picker.Item key={option} value={option}>
                  {({ selected }) => (
                    <div className={selected ? cn("selected-item") : ""}>
                      {option}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      )}
    </div>
  );
};

export default CalendarHeaderView;
