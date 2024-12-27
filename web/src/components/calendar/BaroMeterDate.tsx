import React, { useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/barometerDate.module.scss";
import Image from "next/image";
import { basePath } from "next.config";
import { currentReportState } from "@/recoils/reports";
import { useRecoilValue } from "recoil";

const cn = classNames.bind(scss);

type succesGoalCountType = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * 2024.10.26 기준 마크업 컴포넌트 코드로 업데이트 완료
 */
interface BaroMeterDateViewProps {
  date: number;
  successGoalCount: succesGoalCountType;
  imageUrl: string;
  hasScore: boolean;
  isActive: boolean;
  handleClick: () => void;
}

const BaroMeterDateView = ({
  date,
  successGoalCount,
  imageUrl,
  hasScore,
  isActive,
  handleClick,
}: BaroMeterDateViewProps) => {
  return (
    <div
      className={cn("date", "date-today", "calendar-column", {
        "is-active": isActive,
      })}
      onClick={handleClick}
    >
      <button type="button" className={cn("group")}>
        <Image
          className={cn("vector")}
          style={{ strokeWidth: "0.84px" }}
          alt="Vector"
          fill
          src={imageUrl}
        />
        {!hasScore && <div className={cn("text-wrapper")}>{date}</div>}
      </button>
      {/* TODO 수정 필요 */}
      <div className={cn("frame")}>
        {[...Array(successGoalCount)].map((i) => (
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
  isActive?: boolean;
  onClick?: () => void;
}

export default function BaroMeterDate({
  date,
  isActive,
  onClick,
}: BaroMeterDateProps) {
  const report = useRecoilValue(currentReportState(date));

  const imageUrl = useMemo(() => {
    let imageName;
    switch (report?.score) {
      case 1:
        imageName = "date_bad";
        break;
      case 2:
        imageName = "date_notgood";
        break;
      case 3:
        imageName = "date_good";
        break;
      case 4:
        imageName = "date_nice";
        break;
      default:
        imageName = isActive ? "date-today" : "date-monthly";
    }
    return `${basePath}/calendar/${imageName}.svg`;
  }, [isActive, report]);

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
    successGoalCount: (report?.archivedCount ?? 0) as succesGoalCountType,
    imageUrl,
    hasScore: !!report?.score && report?.score > 0,
    isActive: !!isActive,
    handleClick,
  };

  return <BaroMeterDateView {...viewProps} />;
}
