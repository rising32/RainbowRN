import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const BackwardSVG = (props: SvgProps) => (
  <Svg width={28} height={28} viewBox="0 0 28 28" {...props}>
    <Path
      d="M8.34863 13.6543C8.34863 13.9619 8.46289 14.2256 8.70898 14.4541L15.5469 21.1514C15.7402 21.3447 15.9863 21.4502 16.2764 21.4502C16.8564 21.4502 17.3223 20.9932 17.3223 20.4043C17.3223 20.1143 17.1992 19.8594 17.0059 19.6572L10.8447 13.6543L17.0059 7.65137C17.1992 7.44922 17.3223 7.18555 17.3223 6.9043C17.3223 6.31543 16.8564 5.8584 16.2764 5.8584C15.9863 5.8584 15.7402 5.96387 15.5469 6.15723L8.70898 12.8457C8.46289 13.083 8.34863 13.3467 8.34863 13.6543Z"
      fill={props.fill ? props.fill : '#000'}
      stroke={props.stroke ? props.stroke : '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth ? props.strokeWidth : 2}
    />
  </Svg>
);
export default BackwardSVG;
