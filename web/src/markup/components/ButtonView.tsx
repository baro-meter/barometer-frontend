import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/button.module.scss";

const cn = classNames.bind(scss);

export interface ButtonProps {
  label: string;
  primary?: boolean;
  disabled?: boolean;
}

export const Button = ({ label, primary = false, disabled }: ButtonProps) => {
  const buttonMode = primary ? 'button-primary' : 'button-secondary';
  return (
    <button type="button" className={cn("button", buttonMode)} disabled={disabled}>{label}</button>
  );
};

export default Button;
