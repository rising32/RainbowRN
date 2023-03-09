import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
};

const SafeArea = ({children}: Props) => {
  return (
    <SafeAreaView style={{flex: 1}} edges={['left', 'right']}>
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;
