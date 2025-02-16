import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/button.module.scss";

const cn = classNames.bind(scss);

export interface ButtonProps {
  label: string;
  shape?: "default" | "full";
  primary?: boolean;
  disabled?: boolean;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  label,
  shape = "default",
  primary = false,
  disabled,
  as = "button",
  href,
  type = "button",
}: ButtonProps) => {
  const buttonMode = primary ? "button-primary" : "button-secondary";

  if (as === "a") {
    return (
      <a
        href={href}
        className={cn("button", buttonMode, {
          "button-full": shape === "full",
        })}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={cn("button", buttonMode, {
        "button-full": shape === "full",
      })}
      disabled={disabled}
      onClick={() => {}}
    >
      {label}
    </button>
  );
};

export default Button;
