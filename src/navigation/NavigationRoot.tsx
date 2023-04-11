import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppNavigator from './AppNavigator';

type Props = {
  onReady: () => void;
};

const NavigationRoot = ({onReady}: Props) => {
  return (
    <NavigationContainer onReady={onReady}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default NavigationRoot;
