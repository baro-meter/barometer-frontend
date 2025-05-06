import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/barometerDate.module.scss";
import Image from "next/image";
import { basePath } from "next.config";
import { baroMeterReportState } from "@/recoils/reports";
import { useRecoilValue } from "recoil";

const cn = classNames.bind(scss);

interface BaroMeterDateViewProps {
  date: number;
  imageUrl: string;
  isActive: boolean;
  isToday: boolean;
  score?: number;
  handleClick: () => void;
}

const BaroMeterDateView = ({
  date,
  imageUrl,
  isActive,
  isToday,
  score,
  handleClick,
}: BaroMeterDateViewProps) => {
  const showDate = useMemo(() => {
    if (isActive) return true;
    return !score;
  }, [isActive, score]);

  return (
    <div
      className={cn("date", "calendar-column", {
        "date-today": isToday,
        "is-active": isActive,
        "date-bad": score === 0,
        "date-good": !!score && score >= 1,
        "date-nice": !!score && score >= 3,
      })}
      onClick={handleClick}
    >
      <button type="button" className={cn("group")}>
        <Image className={cn("vector")} alt="" fill src={imageUrl} />
        {showDate && <div className={cn("text-wrapper")}>{date}</div>}
      </button>
      <div className={cn("frame")}>
        {[...Array(score)].map((i) => (
          <div className={cn("ellipse")} key={i}>
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

interface BaroMeterDateProps {
  date: number;
  score?: number; // 없으면 그냥 날짜 표시
  isToday?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export default function BaroMeterDate({
  date,
  score,
  isToday = false,
  isActive = false,
  onClick,
}: BaroMeterDateProps) {
  const report = useRecoilValue(baroMeterReportState(date));

  const imageUrl = useMemo(() => {
    let imageName = "date-monthly";
    // TODO 개수 필드에 따라 표시 변경 필요
    if (isToday) {
      imageName = "date-today";
    } else if (!!score && score >= 0) {
      if (score >= 3) {
        imageName = isActive ? "date-nice-active" : "date-nice";
      } else if (score >= 1) {
        imageName = isActive ? "date-good-active" : "date-good";
      } else if (score === 0) {
        imageName = isActive ? "date-bad-active" : "date-bad";
      }
      console.log(`${date} -> ${score}`);
    }
    return `${basePath}/calendar/${imageName}.svg`;
  }, [isActive, score]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (date <= 0) {
    return (
      <div className={cn("date", "date-today", "calendar-column")}>
        <div className={cn("group")}></div>
      </div>
    );
  }

  const viewProps = {
    date,
    imageUrl,
    score,
    isActive: !!isActive,
    isToday,
    handleClick,
  };

  return <BaroMeterDateView {...viewProps} />;
}
