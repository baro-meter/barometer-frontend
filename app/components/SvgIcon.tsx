import React from 'react';
import {SvgProps} from 'react-native-svg';

// 직전에 만들었던 아이콘 관리 파일에서 import
import * as Icons from './icon';

type IconProps = SvgProps & {
  name: keyof typeof Icons;
  width?: number;
  height?: number;
  color?: string;
  onPress?: () => void;
};

function Icon({name, width, height, color, onPress}: IconProps) {
  const SvgIcon = Icons[name];

  // svg 아이콘은 정사각형으로 제작했기 때문에 width, height값 둘다 size 적용

  const props = {
    ...(width !== undefined ? {width} : {}),
    ...(height !== undefined ? {height} : {}),
    ...(color !== undefined ? {color} : {}),
  };

  return <SvgIcon {...props} onPress={onPress} />;
}

export default Icon;
