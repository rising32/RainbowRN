import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const SearchSVG = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M17 17l4 4M3 11a8 8 0 1016 0 8 8 0 00-16 0z"
      fill="none"
      stroke={props.stroke ? props.stroke : '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
export default SearchSVG;
