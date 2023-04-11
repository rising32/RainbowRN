import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const PlusSVG = (props: SvgProps) => (
  <Svg width={800} height={800} viewBox="0 0 24 24" {...props}>
    <Path
      d="M5 12h14m-7-7v14"
      fill="none"
      stroke={props.stroke ? props.stroke : 'gray'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
export default PlusSVG;
