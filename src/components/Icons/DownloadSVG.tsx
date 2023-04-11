import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const DownloadSVG = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M6 20h12M12 4v12m0 0l3.5-3.5M12 16l-3.5-3.5"
      fill="none"
      stroke={props.stroke ? props.stroke : 'gray'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
export default DownloadSVG;
