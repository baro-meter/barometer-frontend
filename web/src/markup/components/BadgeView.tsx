import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/badge.module.scss";
import Image from "next/image";
import { basePath } from "next.config";

const cn = classNames.bind(scss);

export interface BadgeProps {
  status: "excellent" | "good" | "insufficient" | "poor";
  statusText: "완벽했어요" | "적당해요" | "노력했어요" | "못했어요";
}

export const Badge = ({ status, statusText }: BadgeProps) => {
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
