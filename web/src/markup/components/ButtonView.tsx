import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/button.module.scss";

const cn = classNames.bind(scss);

export interface ButtonProps {
  label: string;
  primary?: boolean;
  disabled?: boolean;
  as?: "button" | "a";
  href?: string;
}

export const Button = ({
  label,
  primary = false,
  disabled,
  as = "button",
  href,
}: ButtonProps) => {
  const buttonMode = primary ? "button-primary" : "button-secondary";

  if (as === "a") {
    return (
      <a href={href} className={cn("button", buttonMode)}>
        {label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cn("button", buttonMode)}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
