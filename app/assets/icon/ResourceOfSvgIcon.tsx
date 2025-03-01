import React from 'react';
import {SvgProps} from 'react-native-svg';

type ResourceOfSvgIconProps = SvgProps & {
  iconSources: {[key: string]: (props: any) => React.JSX.Element};
  name: string;
  onPress?: () => void;
};

function ResourceOfSvgIcon(props: ResourceOfSvgIconProps) {
  const SvgIcon = props.iconSources[props.name];
  if (!SvgIcon) {
    console.error(`resource에 ${props.name} image가 없습니다.`);
    return <></>;
  }
  // svg 아이콘은 정사각형으로 제작했기 때문에 width, height값 둘다 size 적용

  return <SvgIcon {...props} />;
}

export default ResourceOfSvgIcon;
