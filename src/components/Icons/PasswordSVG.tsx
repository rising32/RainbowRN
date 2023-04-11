import React from 'react';
import {Svg, Path, G, SvgProps} from 'react-native-svg';

const PasswordSVG = (props: SvgProps) => (
  <Svg width={1000} height={1000} viewBox="0 0 1000 1000" {...props}>
    <G>
      <Path
        d="M240.4,336.3c0.5-13.7,0.8-27,1.6-40.2c1.5-23.2,0.9-46.9,5.4-69.6c20.5-105,80.1-176.3,184.4-206.7c39.2-11.5,79.3-12.1,119.5-5.4c43.7,7.3,83.3,24.3,118,51.9c29.1,23.1,51.7,51.6,68.2,84.9c12.4,25,20.9,51.4,24.9,78.9c2.4,16.8,3.2,34,3.7,51c0.5,16.6-0.1,33.2-0.3,49.7c0,1.6,0,3.2,0,5.6c7.2,0,14-0.1,20.8,0c14.1,0.1,28.2,1.2,41.8,5.4c41,12.6,69.6,38.9,86.1,78.3c6.8,16.4,9.4,33.7,9.4,51.4c0,127.7,0.1,255.5,0,383.2c0,46.3-18.7,83.5-56.2,110.8c-23,16.7-49.3,24.3-77.6,24.3c-193.4,0.1-386.8,0.4-580.2-0.2c-57-0.2-98.2-27.9-122.7-79.5c-8.1-17.1-11-35.6-11-54.5c0.1-128.4-0.4-256.8,0.2-385.2c0.3-57.1,27.7-98.2,79.2-122.8c17.7-8.5,36.9-11.2,56.5-11.3C221.3,336.3,230.7,336.3,240.4,336.3 M500.1,919.7c2,0,3.9,0,5.9,0c94.1,0,188.2-0.3,282.3,0.2C828,920,854.2,889,854,854.1c-0.6-127.3-0.2-254.5-0.3-381.8c0-3.9,0.1-7.9-0.6-11.8c-5.5-33.1-30-54-63.6-54c-193.1,0-386.2,0-579.3,0c-5.4,0-10.9,0.4-16.1,1.6c-29.1,6.9-48,31.6-48,62.3c0,116.3,0,232.5,0,348.8c0,13.3-0.2,26.6,0.1,39.9c0.3,15.2,5.7,28.5,15.9,39.8c13.5,15,30.7,20.8,50.7,20.8C308.6,919.6,404.4,919.7,500.1,919.7 M695.4,336c0.1-1.4,0.4-2.5,0.4-3.6c0.2-18.7,0.5-37.4,0.4-56.1c-0.3-37.6-9-73.1-28.3-105.6c-20.1-33.8-48.2-58.6-84.2-74.2c-35.4-15.3-72.4-19.1-110.4-13.8c-35.5,5-67.3,18.6-94.3,42.1c-40.2,34.9-60.5,80.1-65,132.5c-2.1,24.3-2.1,48.8-3.1,73.3c-0.1,1.7,0,3.5,0,5.3H695.4z"
        fill={props.stroke ? props.stroke : 'gray'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        d="M464.9,709.3c0-16.3-0.1-32.5,0.1-48.8c0-3.2-0.8-5.3-3.6-7.3c-23.3-17.3-32.9-40.8-27-69c5.8-27.7,23.8-45.3,51.4-51.8c43.4-10.3,84.7,25.7,81.4,70.4c-1.6,21.3-11.2,38.1-28.5,50.4c-2.6,1.8-3.5,3.7-3.5,6.9c0.1,32.3,0.1,64.7,0.1,97c0,12.5-3.8,23.3-14.2,30.9c-10.8,8-22.7,9.4-34.9,4.1c-12-5.2-19.9-14.6-20.5-27.8c-0.8-18.3-0.2-36.7-0.2-55.1C465.3,709.3,465.1,709.3,464.9,709.3"
        fill={props.stroke ? props.stroke : 'gray'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </G>
  </Svg>
);
export default PasswordSVG;
