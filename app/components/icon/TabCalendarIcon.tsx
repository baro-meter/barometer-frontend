import * as React from 'react';
import Svg, {Path, Circle, SvgProps} from 'react-native-svg';

type SvgComponentProps = SvgProps & {
  color?: string;
};

function SvgComponent(props: SvgComponentProps) {
  const svgProps = {...props, color: undefined};
  const {color} = props;
  return (
    <Svg width={21} height={23} viewBox="0 0 21 23" fill="none" {...svgProps}>
      <Path
        d="M14.45 1.512v3.21m-7.9-3.21v3.21M1.61 10.277H19.39M3.587 4.722h13.827c1.09 0 1.975.884 1.975 1.975V19.29c0 1.09-.884 1.975-1.975 1.975H3.587a1.975 1.975 0 01-1.976-1.976V6.697c0-1.091.885-1.975 1.976-1.975z"
        stroke={color}
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={6.8999} cy={15.5} r={1} fill={color} />
      <Circle cx={10.5} cy={15.5} r={1} fill={color} />
      <Circle cx={14.0996} cy={15.5} r={1} fill={color} />
    </Svg>
  );
}

export default SvgComponent;
