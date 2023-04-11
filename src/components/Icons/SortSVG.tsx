import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const SortSVG = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M10 14H2M8 10H2M6 6H2M12 18H2M19 20V4m0 16l3-3m-3 3l-3-3m3-13l3 3m-3-3l-3 3"
      fill="none"
      stroke={props.stroke ? props.stroke : '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
export default SortSVG;
