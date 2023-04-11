import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const ReturnSVG = (props: SvgProps) => (
  <Svg width={48} height={48} viewBox="0 0 48 48" {...props}>
    <Path
      d="m13 8-7 6 7 7"
      fill="none"
      stroke={props.stroke ? props.stroke : 'gray'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <Path
      d="M6 14h22.994c6.883 0 12.728 5.62 12.996 12.5.284 7.27-5.723 13.5-12.996 13.5H11.998"
      fill="none"
      stroke={props.stroke ? props.stroke : 'gray'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth ? props.strokeWidth : 1.5}
    />
  </Svg>
);
export default ReturnSVG;
