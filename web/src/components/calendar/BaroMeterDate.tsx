import React, { useMemo } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/barometerDate.module.scss";
import Image from "next/image";
import { basePath } from "next.config";

const cn = classNames.bind(scss);

type scoreType = 0 | 1 | 2 | 3 | 4;
type succesGoalCountType = 0 | 1 | 2 | 3 | 4 | 5;

interface BaroMeterDateViewProps {
  date: number;
  successGoalCount: succesGoalCountType;
  imageUrl: string;
  hasScore: boolean;
  handleClick: () => void;
}

const BaroMeterDateView = ({
  date,
  successGoalCount,
  imageUrl,
  hasScore,
  handleClick,
}: BaroMeterDateViewProps) => {
  return (
    <div
      className={cn("date", "date-today", "calendar-column")}
      onClick={handleClick}
    >
      <div className={cn("group")}>
        <Image className={cn("vector")} alt="Vector" fill src={imageUrl} />
        {!hasScore && <div className={cn("text-wrapper")}>{date}</div>}
      </div>
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
  score: scoreType;
  successGoalCount: succesGoalCountType;
  isActive?: boolean;
  onClick?: () => void;
}

export default function BaroMeterDate({
  date,
  score,
  successGoalCount,
  isActive,
  onClick,
}: BaroMeterDateProps) {
  const imageUrl = useMemo(() => {
    let imageName;
    switch (score) {
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
    successGoalCount,
    imageUrl,
    hasScore: score > 0,
    handleClick,
  };

  return <BaroMeterDateView {...viewProps} />;
}
