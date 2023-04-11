import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const NavArrowDownSVG = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke={props.stroke ? props.stroke : '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
export default NavArrowDownSVG;
