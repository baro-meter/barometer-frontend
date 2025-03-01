import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

type SvgComponentProps = SvgProps & {};

function SvgComponent(props: SvgComponentProps) {
  return (
    <Svg width={37} height={37} viewBox="0 0 37 37" fill="none" {...props}>
      <Path
        d="M36.5 9.48942C36.5 4.52576 32.4708 0.50104 27.5 0.50104H9.65231C9.38023 0.496892 9.10815 0.505189 8.83608 0.52524C8.80008 0.528005 8.76408 0.530771 8.72808 0.534228C8.70108 0.536302 8.67408 0.539068 8.64639 0.541142C4.07646 0.971201 0.5 4.81339 0.5 9.48942C0.5 11.9979 1.52946 14.2664 3.18892 15.8967L19.193 33.5451C22.5299 37.2248 28.2214 37.5062 31.9052 34.1736C35.5896 30.841 35.8714 25.1568 32.5345 21.4778L30.9782 19.7611C30.3544 19.0731 30.5787 17.9883 31.4157 17.5838C34.4245 16.1298 36.5 13.0516 36.5 9.48872V9.48942Z"
        fill="#79CCAD"
      />
    </Svg>
  );
}

export default SvgComponent;
