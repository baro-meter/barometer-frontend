import React, { useMemo } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/barometerDate.module.scss";
import Image from "next/image";

const cn = classNames.bind(scss);

type scoreType = 0 | 1 | 2 | 3 | 4;
type succesGoalCountType = 0 | 1 | 2 | 3 | 4 | 5;

interface BaroMeterDateViewProps {
  date: number;
  successGoalCount: succesGoalCountType;
  imageUrl: string;
  hasScore: boolean;
}

const BaroMeterDateView = ({
  date,
  successGoalCount,
  imageUrl,
  hasScore,
}: BaroMeterDateViewProps) => {
  return (
    <div className={cn("date", "date-today", "calendar-column")}>
      <button type="button" className={cn("group")}>
        <Image className={cn("vector")} style={{stroke: "red", strokeWidth: "0.84px"}} alt="Vector" fill storke-width="0.84px" src={imageUrl} />
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
  score: scoreType;
  successGoalCount: succesGoalCountType;
  isActive?: boolean;
}

export default function BaroMeterDate({
  date,
  score,
  successGoalCount,
  isActive,
}: BaroMeterDateProps) {
  if (date <= 0) {
    return (
      <div className={cn("date", "date-today", "calendar-column")}>
        <div className={cn("group")}></div>
      </div>
    );
  }

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
    return `/calendar/${imageName}.svg`;
  }, [isActive, score]);

  const viewProps = { date, successGoalCount, imageUrl, hasScore: score > 0 };

  return <BaroMeterDateView {...viewProps} />;
}