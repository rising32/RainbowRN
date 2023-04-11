import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';

const PageEditSVG = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M20 12V5.749a.6.6 0 00-.176-.425l-3.148-3.148A.6.6 0 0016.252 2H4.6a.6.6 0 00-.6.6v18.8a.6.6 0 00.6.6H11M8 10h8M8 6h4m-4 8h3M17.954 16.94l1-1a1.121 1.121 0 011.586 0v0a1.121 1.121 0 010 1.585l-1 1m-1.586-1.586l-2.991 2.991a1 1 0 00-.28.553l-.244 1.557 1.557-.243a1 1 0 00.553-.28l2.99-2.992m-1.585-1.586l1.586 1.586"
      fill="none"
      stroke={props.stroke ? props.stroke : 'gray'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <Path
      d="M16 2v3.4a.6.6 0 00.6.6H20"
      fill="none"
      stroke={props.stroke ? props.stroke : 'gray'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
export default PageEditSVG;
