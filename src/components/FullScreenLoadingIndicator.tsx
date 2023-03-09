import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import CONST from '../CONST';

type Props = {
  loadingText: string;
};

const FullScreenLoadingIndicator = ({loadingText = ''}: Props) => {
  const refTimer = useRef<number | null>(null);

  console.log('[LoadingIndicator] Became visible', loadingText);
  useEffect(() => {
    refTimer.current = setTimeout(
      () =>
        console.log('[LoadingIndicator] Visible after timeout', loadingText),
      CONST.SPINNER_TIMEOUT,
    );
    return () => {
      if (refTimer.current === null) {
        return;
      }
      clearTimeout(refTimer.current);
      refTimer.current = null;
    };
  }, [loadingText]);

  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: '#061B09',
          opacity: 0.8,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        },
      ]}>
      <ActivityIndicator color="#AFBBB0" size="large" />
    </View>
  );
};

export default FullScreenLoadingIndicator;
