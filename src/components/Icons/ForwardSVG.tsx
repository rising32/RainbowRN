import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const ForwardSVG = (props: SvgProps) => (
  <Svg width={28} height={28} viewBox="0 0 28 28" {...props}>
    <Path
      d="M19.6514 13.6543C19.6426 13.3467 19.5283 13.083 19.291 12.8457L12.4531 6.15723C12.251 5.96387 12.0137 5.8584 11.7236 5.8584C11.1348 5.8584 10.6777 6.31543 10.6777 6.9043C10.6777 7.18555 10.792 7.44922 10.9941 7.65137L17.1465 13.6543L10.9941 19.6572C10.792 19.8594 10.6777 20.1143 10.6777 20.4043C10.6777 20.9932 11.1348 21.4502 11.7236 21.4502C12.0049 21.4502 12.251 21.3447 12.4531 21.1514L19.291 14.4541C19.5371 14.2256 19.6514 13.9619 19.6514 13.6543Z"
      fill={props.fill ? props.fill : '#000'}
      stroke={props.stroke ? props.stroke : '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth ? props.strokeWidth : 2}
    />
  </Svg>
);
export default ForwardSVG;
