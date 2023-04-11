import React from 'react';
import {Text, View} from 'react-native';
type Props = {
  children: React.ReactNode;
};
const ScreenLayout = ({children}: Props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {children}
      <Text
        style={{
          textAlign: 'center',
          fontSize: 12,
          marginBottom: 30,
          marginTop: 15,
        }}>
        {'@2023 EXATEC PTE LTD. All rights reserved.'}
      </Text>
    </View>
  );
};

export default ScreenLayout;
