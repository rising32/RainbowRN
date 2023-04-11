import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const MoonSVG = (props: SvgProps) => (
  <Svg width={800} height={800} viewBox="0 0 15 15" {...props}>
    <Path
      d="M1.66 11.362A6.5 6.5 0 0 0 7.693.502a7 7 0 1 1-6.031 10.86Z"
      fill="none"
      stroke={props.stroke ? props.stroke : '#FFFFFF'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
export default MoonSVG;
