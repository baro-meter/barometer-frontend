import Text from "@/markup/components/TextView";

export default {
  title: "Markup/Components/Text",
  component: Text,
};

export const Default = () => (
  <Text as="p" size={14} color="color-system-gray-gray99">
    태그를 바꾸고 color를 입력해서 사용합니다.
  </Text>
);

export const Ellipsis = () => (
  <Text as="p" size={16} color="color-system-red-red50" ellipsis>
    태그를 바꾸고 color를 입력해서 사용합니다. 굵기도 설정 가능.태그를 바꾸고
    color를 입력해서 사용합니다. 굵기도 설정 가능.태그를 바꾸고 color를 입력해서
    사용합니다. 굵기도 설정 가능.태그를 바꾸고 color를 입력해서 사용합니다.
    굵기도 설정 가능.
  </Text>
);

export const Align = () => (
  <Text as="p" size={16} color="color-system-yellow-yellow90" align="center">
    태그를 바꾸고 color를 입력해서 사용합니다. 굵기도 설정 가능.
  </Text>
);

export const Bold = () => (
  <Text as="p" size={16} color="color-system-yellow-yellow90" bold="extra-bold">
    태그를 바꾸고 color를 입력해서 사용합니다. 굵기도 설정 가능.
  </Text>
);

export const Color = () => (
  <Text as="span" size={20} color="color-system-purple-purple40">
    태그를 바꾸고 color를 입력해서 사용합니다. 굵기도 설정 가능.
  </Text>
);
