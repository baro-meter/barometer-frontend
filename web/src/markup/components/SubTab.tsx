import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/subtab.module.scss";
import Image from "next/image";
import { basePath } from "next.config";

const cn = classNames.bind(scss);

export interface SubTabProps {
  title: string;
  hasBorder?: boolean;
}

const SubTab = ({ title, hasBorder = false }: SubTabProps) => {
  return (
    <div className={cn("subtab", { "has-border": hasBorder })}>
      <div className={cn("inner")}>
        <h2 className={cn("title")}>{title}</h2>
        <button
          type="button"
          className={cn("btn-more")}
          aria-label="옵션 (수정/삭제)"
        >
          <Image
            src={`${basePath}/img/icon-dots.svg`}
            width={17}
            height={18}
            alt={""}
          />
        </button>
      </div>
    </div>
  );
};

export default SubTab;
