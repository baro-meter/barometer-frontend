import React from 'react';
import {SvgProps} from 'react-native-svg';

import {TabIcons} from '.';

type TabIconProps = SvgProps & {
  name: keyof typeof TabIcons;
  width?: number;
  height?: number;
  color?: string;
  onPress?: () => void;
};

function TabIcon({name, width, height, color, onPress}: TabIconProps) {
  const TabSvgIcon = TabIcons[name];

  // svg 아이콘은 정사각형으로 제작했기 때문에 width, height값 둘다 size 적용

  const props = {
    ...(width !== undefined ? {width} : {}),
    ...(height !== undefined ? {height} : {}),
    ...(color !== undefined ? {color} : {}),
  };

  return <TabSvgIcon {...props} onPress={onPress} />;
}

export default TabIcon;
