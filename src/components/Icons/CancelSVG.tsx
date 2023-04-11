import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const CancelSVG = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
      fill="none"
      stroke={props.stroke ? props.stroke : '#FFFFFF'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
export default CancelSVG;
