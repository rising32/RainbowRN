import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import {coreState} from '../recoil/atoms';

const Core = () => {
  const {loading, loadingText} = useRecoilValue(coreState);

  if (!loading) {
    return null;
  }
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          alignItems: 'center',
          justifyContent: 'center',
        },
        StyleSheet.absoluteFill,
      ]}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" />
      <ActivityIndicator size="large" color="blue" />
      {loadingText && (
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          {loadingText}
        </Text>
      )}
    </SafeAreaView>
  );
};

export default Core;
