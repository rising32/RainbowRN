import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

const CustomStatusBar = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
  }, []);
  return <StatusBar />;
};

export default CustomStatusBar;
