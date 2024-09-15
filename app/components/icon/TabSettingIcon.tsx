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
        d="M18.778 9.576v.818a8.889 8.889 0 11-5.271-8.124m5.27 1.013L9.89 12.18 7.222 9.514"
        stroke={color}
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
