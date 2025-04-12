import { Color } from "@/types/color";

export const COLOR_VALUES: Record<Color, string> = {
  "color-system-blue-blue0": "#253852",
  "color-system-blue-blue10": "#29548c",
  "color-system-blue-blue20": "#366fbc",
  "color-system-blue-blue60": "#66a9f1",
  "color-system-gray-gray0": "#1d1e1f",
  "color-system-gray-gray10": "#252526",
  "color-system-gray-gray20": "#343638",
  "color-system-gray-gray30": "#494b4d",
  "color-system-gray-gray40": "#5c6166",
  "color-system-gray-gray5": "#212324",
  "color-system-gray-gray50": "#797c80",
  "color-system-gray-gray60": "#909499",
  "color-system-gray-gray70": "#b5b8bd",
  "color-system-gray-gray80": "#c3c4c7",
  "color-system-gray-gray90": "#cecfd1",
  "color-system-gray-gray95": "#e4e5e5",
  "color-system-gray-gray99": "#fafafa",
  "color-system-indigo-indigo0": "#1a1d33",
  "color-system-indigo-indigo20": "#425ad3",
  "color-system-indigo-indigo40": "#3a4a99",
  "color-system-indigo-indigo50": "#4759b2",
  "color-system-indigo-indigo60": "#4e63cc",
  "color-system-indigo-indigo70": "#5c73e5",
  "color-system-lime-lime40": "#92c744",
  "color-system-lime-lime60": "#b5e164",
  "color-system-orange-orange40": "#ed8537",
  "color-system-orange-orange50": "#c65b3a",
  "color-system-orange-orange60": "#f3ad5f",
  "color-system-pink-pink60": "#f783ac",
  "color-system-purple-purple0": "#42395e",
  "color-system-purple-purple20": "#6741d9",
  "color-system-purple-purple40": "#7950f2",
  "color-system-purple-purple60": "#9775fa",
  "color-system-purple-purple70": "#b197fc",
  "color-system-red-red0": "#291716",
  "color-system-red-red40": "#b24d47",
  "color-system-red-red50": "#ed7470",
  "color-system-red-red60": "#ef8d8a",
  "color-system-teal-teal20": "#41906b",
  "color-system-teal-teal50": "#5fc69a",
  "color-system-teal-teal60": "#6ed6ac",
  "color-system-teal-teal70": "#87e3c0",
  "color-system-yellow-yellow0": "#665d42",
  "color-system-yellow-yellow20": "#bfa250",
  "color-system-yellow-yellow60": "#f8d65b",
  "color-system-yellow-yellow90": "#fdf3c5",
  "surface-contents-bg": "#1a1a1a",
  "surface-surface": "#0f0f0f",
  "surface-text-field": "#171717",
  white: "#ffffff",
};

/**
 * 색상명으로부터 실제 색상 값을 가져오는 함수
 * @param colorName 색상명 (color.ts에 정의된 Color 타입)
 * @returns 해당 색상의 실제 값
 */
export const getColorValue = (colorName: Color): string => {
  return COLOR_VALUES[colorName];
};
