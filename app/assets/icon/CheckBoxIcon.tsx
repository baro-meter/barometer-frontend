import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

type SvgComponentProps = SvgProps & {
  isChecked: boolean;
};

function SvgComponent(props: SvgComponentProps) {
  if (props.isChecked) {
    return (
      <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
        <Path
          d="M2 5.76471C2 3.68552 3.68552 2 5.76471 2H14.2353C16.3145 2 18 3.68552 18 5.76471V14.2353C18 16.3145 16.3145 18 14.2353 18H5.76471C3.68552 18 2 16.3145 2 14.2353V10V5.76471Z"
          stroke="#AAADB3"
          strokeWidth={1.66667}
        />
        <Path
          d="M14.0771 7L8.96647 12.681L6.2998 10.0143"
          stroke="#AAADB3"
          strokeWidth={1.66667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  } else {
    return (
      <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
        <Path
          d="M2 5.76471C2 3.68552 3.68552 2 5.76471 2H14.2353C16.3145 2 18 3.68552 18 5.76471V14.2353C18 16.3145 16.3145 18 14.2353 18H5.76471C3.68552 18 2 16.3145 2 14.2353V10V5.76471Z"
          stroke="#494B4D"
          strokeWidth={1.66667}
        />
      </Svg>
    );
  }
}

export default SvgComponent;
