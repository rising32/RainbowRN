import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const ArrowLeftSVG = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M21 12H3m0 0l8.5-8.5M3 12l8.5 8.5"
      fill="none"
      stroke={props.stroke ? props.stroke : 'gray'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
export default ArrowLeftSVG;
