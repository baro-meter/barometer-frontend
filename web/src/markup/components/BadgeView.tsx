import React, { useMemo } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/badge.module.scss";
import Image from "next/image";
import { basePath } from "next.config";
import { BaroMeterScoreType } from "@/types/barometerType";

const cn = classNames.bind(scss);

export interface BadgeProps {
  score: BaroMeterScoreType;
}

export const Badge = ({ score }: BadgeProps) => {
  const status = useMemo(() => {
    switch (score) {
      case 1:
        return "poor";
      case 2:
        return "insufficient";
      case 3:
        return "good";
      default:
        return "excellent";
    }
  }, [score]);

  const statusText = useMemo(() => {
    switch (score) {
      case 1:
        return "못했어요";
      case 2:
        return "노력했어요";
      case 3:
        return "적당해요";
      default:
        return "완벽했어요";
    }
  }, [score]);

  return (
    <strong className={cn("badge", status)}>
      <Image
        src={`${basePath}/img/icon-${status}.svg`}
        width={14}
        height={14}
        alt=""
      />
      {statusText}
    </strong>
  );
};

export default Badge;
