import React from 'react';
import {View, Text} from 'react-native';

type Props = {
  title: string;
  width: number;
  textAlign?: 'center' | 'auto' | 'left' | 'right' | 'justify' | undefined;
};
const TableBodyItem = ({title, width, textAlign = 'center'}: Props) => {
  return (
    <View
      style={[
        {
          width: width,
        },
        textAlign === 'left'
          ? {}
          : {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <Text
        style={{
          textAlign: textAlign,
          fontSize: 14,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default TableBodyItem;
