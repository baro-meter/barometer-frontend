import { ElementType, ReactNode } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/text.module.scss";
import { Color } from "@/types/color";

const cn = classNames.bind(scss);

type TextSize =
  | 32
  | 30
  | 28
  | 26
  | 24
  | 22
  | 20
  | 18
  | 16
  | 15
  | 14
  | 13
  | 12
  | 11
  | 10
  | 0;

interface TextViewProps extends React.HTMLAttributes<HTMLElement> {
  as: ElementType | keyof JSX.IntrinsicElements;
  align?: "left" | "center" | "right";
  alt?: boolean;
  bold?: "light" | "medium" | "default" | "semi-bold" | "bold" | "extra-bold";
  color?: Color;
  size?: TextSize;
  ellipsis?: boolean;
  className?: string;
  children?: ReactNode;
}

const TextView = ({
  as: Component,
  align,
  alt = false,
  bold = "default",
  color = "surface-text-field",
  size = 16,
  ellipsis,
  className,
  children,
  ...attr
}: TextViewProps) => {
  return (
    <Component
      className={[
        cn("text", align, {
          alt,
          ellipsis,
          [`size-${size}`]: size >= 0,
          [`${color}`]: color,
          [`${bold}`]: bold,
        }),
        className || "",
      ].join(" ")}
      {...attr}
    >
      {children}
    </Component>
  );
};

export default TextView;
