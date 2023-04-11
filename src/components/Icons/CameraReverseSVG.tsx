import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const CameraReverseSVG = (props: SvgProps) => (
  <Svg width={500} height={500} viewBox="0 0 500 500" {...props}>
    <Path
      d="m342.333 145.188 -26 -41.083c-5.479 -6.375 -13 -10.354 -21.417 -10.354H205.063c-8.417 0 -15.938 3.979 -21.417 10.375L157.646 145.208c-5.458 6.375 -12.5 11.042 -20.917 11.042H78.125A31.25 31.25 0 0 0 46.875 187.5v187.5a31.25 31.25 0 0 0 31.25 31.25h343.75a31.25 31.25 0 0 0 31.25 -31.25V187.5a31.25 31.25 0 0 0 -31.25 -31.25h-57.625c-8.438 0 -16.458 -4.667 -21.937 -11.063Z"
      fill="none"
      stroke={props.stroke ? props.stroke : '#FFFFFF'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
    />
    <Path
      fill="none"
      stroke={props.stroke ? props.stroke : '#FFFFFF'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="M121.104 154.292V132.813H97.667v21.479m230.229 124.229v-13a78.125 78.125 0 0 0 -127.938 -60.167M171.875 252.708v13a78.125 78.125 0 0 0 127.667 60.354"
    />
    <Path
      fill="none"
      stroke={props.stroke ? props.stroke : '#FFFFFF'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="m191.417 265.625 -19.542 -19.542 -19.542 19.542m195.313 0 -19.542 19.542 -19.542 -19.542"
    />
  </Svg>
);
export default CameraReverseSVG;
