import React, { useState, ChangeEvent } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/input.module.scss";
import Image from "next/image";
import { basePath } from "next.config";

const cn = classNames.bind(scss);

export interface TextareaProps {
  textareaId: string;
  textareaName: string;
  fileId: string;
  fileName: string;
  text: string;
  placeholder: string;
}

export const Textarea = ({
  textareaId,
  textareaName,
  fileId,
  fileName,
  text,
  placeholder,
}: TextareaProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
  };

  return (
    <div className={cn("textarea-wrap")}>
      <span className={cn("textarea-text")}>
        <textarea 
          name={textareaName} 
          id={textareaId}
          placeholder={placeholder}
          className={cn("textarea-input")}
        >
          {text}
        </textarea>
      </span>
      <span className={cn("file")}>
        <input
          type="file"
          name={fileName}
          id={fileId}
          accept="image/x-png,image/jpeg,image/jpg"
          className={cn("file-input")}
          onChange={handleFileChange}
        />
      {uploadedImage && (
        <span className={cn("image-preview-wrap")}>
          <Image
            src={uploadedImage}
            alt="Uploaded Image"
            width={42}
            height={42}
            className={cn("image")}
          />
          <button
            type="button"
            className={cn("btn-delete")}
            aria-label="이미지 삭제"
            onClick={handleDeleteImage}
          >
            <Image
              src={`${basePath}/img/icon-delete.svg`}
              width={20}
              height={20}
              alt={""}
            />
          </button>
        </span>
      )}
      </span>
    </div>
  );
};

export default Textarea;
