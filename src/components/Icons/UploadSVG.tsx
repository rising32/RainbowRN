import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const UploadSVG = (props: SvgProps) => (
  <Svg width={800} height={800} viewBox="0 0 52 52" {...props}>
    <Path
      d="M48.5 31h-3c-.8 0-1.5.8-1.5 1.5v10c0 .8-.7 1.5-1.5 1.5h-33c-.8 0-1.5-.7-1.5-1.5v-10c0-.7-.7-1.5-1.5-1.5h-3c-.8 0-1.5.8-1.5 1.5V46c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V32.5c0-.7-.7-1.5-1.5-1.5z"
      fill={props.stroke ? props.stroke : 'gray'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <Path
      d="M27 2.4c-.6-.6-1.5-.6-2.1 0L11.4 15.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0l5.6-5.6c.6-.6 1.8-.2 1.8.7v21.2c0 .8.6 1.5 1.4 1.5h3c.8 0 1.6-.8 1.6-1.5V15.3c0-.9 1-1.3 1.7-.7l5.6 5.6c.6.6 1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1L27 2.4z"
      fill={props.stroke ? props.stroke : 'gray'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
export default UploadSVG;
