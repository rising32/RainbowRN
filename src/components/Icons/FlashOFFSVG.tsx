import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const FlashOFFSVG = (props: SvgProps) => (
  <Svg width={300} height={300} viewBox="0 0 300 300" {...props}>
    <Path
      d="M257.714 118.186a6.378 6.378 0 0 0 -5.585 -3.3H149.996V6.37c0 -2.923 -1.992 -5.483 -4.825 -6.179a6.399 6.399 0 0 0 -7.181 3.166l-95.749 178.731a6.41 6.41 0 0 0 0.147 6.294 6.379 6.379 0 0 0 5.471 3.103h89.366v102.132a6.397 6.397 0 0 0 4.615 6.134c0.581 0.159 1.181 0.249 1.768 0.249a6.448 6.448 0 0 0 5.413 -2.969l108.515 -172.348a6.405 6.405 0 0 0 0.178 -6.497zM149.99 271.499v-86.397a6.377 6.377 0 0 0 -6.383 -6.383H58.519l78.705 -146.917v89.468a6.377 6.377 0 0 0 6.383 6.383h96.948l-90.565 143.846z"
      fill="none"
      stroke={props.stroke ? props.stroke : '#FFFFFF'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
export default FlashOFFSVG;
