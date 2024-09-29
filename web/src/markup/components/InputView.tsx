import React, { useState } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/input.module.scss";
import Image from "next/image";
import { basePath } from "next.config";

const cn = classNames.bind(scss);

export interface InputProps {
  label?: string;
  id: string;
  placeholder: string;
  errorText?: string;
  isError?: boolean;
}

export const Input = ({ label, id, placeholder, errorText, isError }: InputProps) => {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsActive(value.length > 0);
  };

  const handleDelete = () => {
    setInputValue("");
    setIsActive(false);
  };

  return (
    <div className={cn("input-wrap", { "is-error": isError })}>
      {label && 
        <label htmlFor={id} className={cn("input-label")}>{label}</label>
      }
      <span className={cn("input-text")}>
        <input 
          id={id} 
          type="text" 
          placeholder={placeholder} 
          className={cn("input")} 
          value={inputValue}
          onChange={handleChange}
        />
        {isActive &&
          <button type="button" className={cn("btn-delete")} onClick={handleDelete} aria-label="텍스트 지우기">
            <Image
              src={`${basePath}/img/icon-delete-input.svg`}
              width={20}
              height={20}
              alt={""}
            />
          </button>
        }
      </span>
      {isError && 
        <p className={cn("text-error")}>{errorText}</p>
      }
    </div>
  );
};

export default Input;
