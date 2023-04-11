import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const EyeSVG = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M12 14a2 2 0 100-4 2 2 0 000 4z"
      fill="none"
      stroke={props.stroke ? props.stroke : 'gray'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <Path
      d="M21 12c-1.889 2.991-5.282 6-9 6s-7.111-3.009-9-6c2.299-2.842 4.992-6 9-6s6.701 3.158 9 6z"
      fill="none"
      stroke={props.stroke ? props.stroke : 'gray'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
export default EyeSVG;
