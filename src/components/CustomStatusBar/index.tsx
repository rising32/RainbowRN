import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

const CustomStatusBar = () => {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
  }, []);
  return <StatusBar />;
};

export default CustomStatusBar;
