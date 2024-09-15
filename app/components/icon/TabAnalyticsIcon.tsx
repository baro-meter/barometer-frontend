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
        d="M6.835 10.714a.835.835 0 10-1.67 0V13.5a.835.835 0 101.67 0v-2.786zM10 8.022c.461 0 .835.374.835.835V13.5a.835.835 0 01-1.67 0V8.857c0-.46.374-.835.835-.835zM14.835 7a.835.835 0 10-1.67 0v6.5a.835.835 0 101.67 0V7z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 4.5a4 4 0 014-4h12a4 4 0 014 4v12a4 4 0 01-4 4H4a4 4 0 01-4-4v-12zm4-2.33h12a2.33 2.33 0 012.33 2.33v12A2.33 2.33 0 0116 18.83H4a2.33 2.33 0 01-2.33-2.33v-12A2.33 2.33 0 014 2.17z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
