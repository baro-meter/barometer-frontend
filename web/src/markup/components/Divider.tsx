import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/divider.module.scss";

const cn = classNames.bind(scss);

export interface DividerProps {
  spacing?: 20 | 30 | 40;
}

const Divider = ({ spacing = 20 }: DividerProps) => {
  return (
    <hr
      className={cn("divider", {
        "divider-20": spacing === 20,
        "divider-30": spacing === 30,
        "divider-40": spacing === 40,
      })}
    />
  );
};

export default Divider;
