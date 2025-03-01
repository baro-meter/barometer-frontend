import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

type SvgComponentProps = SvgProps & {
  color?: string;
};

function SvgComponent(props: SvgComponentProps) {
  const svgProps = {...props, color: undefined};
  const {color} = props;
  return (
    <Svg width={20} height={21} viewBox="0 0 20 21" fill="none" {...svgProps}>
      <Path
        d="M2 3.5h16M2 10.5h16M2 17.5h16"
        stroke={color}
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
