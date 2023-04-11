import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const ProfileSVG = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
      fill="none"
      stroke={props.stroke ? props.stroke : '#FFFFFF'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <Path
      fill="none"
      stroke={props.stroke ? props.stroke : '#FFFFFF'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 100-6 3 3 0 000 6z"
    />
  </Svg>
);
export default ProfileSVG;
