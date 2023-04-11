import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

const CustomStatusBar = () => {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('white');
    // StatusBar.setBackgroundColor('transparent');
    // StatusBar.setTranslucent(true);
  }, []);
  return <StatusBar />;
};

export default CustomStatusBar;
