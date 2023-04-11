import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const MoonOutlineSVG = (props: SvgProps) => (
  <Svg width={800} height={800} viewBox="0 0 15 15" {...props}>
    <Path
      d="M7.707.003a.5.5 0 0 0-.375.846 6 6 0 0 1-5.569 10.024.5.5 0 0 0-.519.765A7.5 7.5 0 1 0 7.707.003Z"
      fill={props.stroke ? props.stroke : '#FFFFFF'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
export default MoonOutlineSVG;
