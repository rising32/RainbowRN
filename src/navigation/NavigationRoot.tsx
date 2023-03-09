import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import FullScreenLoadingIndicator from '../components/FullScreenLoadingIndicator';
import AppNavigator from './AppNavigator';

type Props = {
  onReady: () => void;
};

const NavigationRoot = ({onReady}: Props) => {
  return (
    <NavigationContainer
      fallback={
        <FullScreenLoadingIndicator loadingText="Navigation Fallback Loader" />
      }
      onReady={onReady}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default NavigationRoot;
